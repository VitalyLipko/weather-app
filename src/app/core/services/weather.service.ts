import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, ReplaySubject, of } from 'rxjs';
import { retryWhen, mergeMap, delay } from 'rxjs/operators';

import { Position } from '../models/position.model';
import { WeatherData } from '../models/weather-data.model';
import { ForecastData } from '../models/forecast-data.model';
import { CycleWeatherData } from '../models/cycle-weather-data.model';
import { GroupWeatherData } from '../models/group-weather-data.model';
import { List } from '../models/list.model';

const apiKey = 'f25ad0c5cec3176c83ad8d9daddb8fe2';
const defaultDelay = 250;
const defaultBackoff = 1000;


interface UrlApi {
  readonly weather: string;
  readonly forecast: string;
  readonly group: string;
  readonly cycle: string;
}

function retryWithBackoff(maxRetry: number, delayMs = defaultDelay, backoffMs = defaultBackoff) {
  let retries = maxRetry;

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        mergeMap(error => {
          if (retries-- > 0) {
            const backoffTime = delayMs + (maxRetry - retries) * backoffMs;
            return of(error).pipe(delay(backoffTime));
          }

          return handleError(error);
        })
      ))
    );
}

function handleError(error: HttpErrorResponse) {
  let message: string;

  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred: ', error.error.message);
  } else {
    console.error(`Openweathermap API returned code ${error.status} ` + `body was: ${error.error.message}`);
  }

  if (error.url.includes('weather?')) {
    message = 'Error in retrieving weather data';
  } else if (error.url.includes('forecast?')) {
    message = 'Error in retrieving forecast data';
  } else if (error.url.includes('group?')) {
    message = 'Error in retrieving group data';
  } else if (error.url.includes('find?')) {
    message = 'Error in retrieving cycle data';
  } else {
    message = 'Something bad happened';
  }

  return throwError({ error, message });
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private urlApi: UrlApi = {
    weather: 'https://api.openweathermap.org/data/2.5/weather?',
    forecast: 'https://api.openweathermap.org/data/2.5/forecast?',
    group: 'https://api.openweathermap.org/data/2.5/group?',
    cycle: 'https://api.openweathermap.org/data/2.5/find?',
  }

  private weatherDataStorage = new ReplaySubject<WeatherData>(1, 2000);
  private forecastDataStorage = new ReplaySubject<ForecastData>(1, 2000);
  private cycleWeatherDataStorage = new ReplaySubject<CycleWeatherData>(1, 2000);
  weatherDataStorage$ = this.weatherDataStorage.asObservable();
  forecastDataStorage$ = this.forecastDataStorage.asObservable();
  cycleWeatherDataStorage$ = this.cycleWeatherDataStorage.asObservable();
  private _errorStatus = new ReplaySubject<number>(1, 2000);
  errorStatus$ = this._errorStatus.asObservable();
  private _isDataLoaded = new ReplaySubject<boolean>(1, 2000);
  isDataLoaded$ = this._isDataLoaded.asObservable();
  forecastTz: number;

  constructor(private http: HttpClient) { }

  set isDataLoaded(state: boolean) {
    this._isDataLoaded.next(state);
  }

  set errorStatus(status: number) {
    this._errorStatus.next(status);
  }

  getWeatherDataByPosition(position: Position): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.urlApi.weather}lat=${(position.latitude).toFixed(2)}&lon=${(position.longitude).toFixed(2)}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retryWithBackoff(2));
  }

  getForecastDataByPosition(position: Position): Observable<ForecastData> {
    return this.http.get<ForecastData>(
      `${this.urlApi.forecast}lat=${(position.latitude).toFixed(2)}&lon=${(position.longitude).toFixed(2)}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retryWithBackoff(2));
  }

  getWeatherDataByName(name: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.urlApi.weather}q=${name}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retryWithBackoff(2));
  }

  getForecastDataByName(name: string): Observable<ForecastData> {
    return this.http.get<ForecastData>(
      `${this.urlApi.forecast}q=${name}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retryWithBackoff(2));
  }

  getGroupWeatherData(idList: string): Observable<GroupWeatherData> {
    return this.http.get<GroupWeatherData>(
      `${this.urlApi.group}id=${idList}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retryWithBackoff(1));
  }

  getCycleWeatherData(position: Position): Observable<CycleWeatherData> {
    return this.http.get<CycleWeatherData>(
      `${this.urlApi.cycle}lat=${(position.latitude).toFixed(2)}&lon=${(position.longitude).toFixed(2)}&units=metric&lang=ru&cnt=6&appid=${apiKey}`
    ).pipe(retryWithBackoff(2));
  }

  getWeatherDataById(id: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.urlApi.weather}id=${id}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retryWithBackoff(2));
  }

  getForecastDataById(id: number): Observable<ForecastData> {
    return this.http.get<ForecastData>(
      `${this.urlApi.forecast}id=${id}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retryWithBackoff(2));
  }

  saveWeatherData(data: WeatherData) {
    this.weatherDataStorage.next(data);
  }

  saveForecastData(data: ForecastData) {
    this.forecastDataStorage.next(data);
  }

  saveCycleWeatherData(data: CycleWeatherData) {
    this.cycleWeatherDataStorage.next(data);
  }

  //Получаем из списка пятидневного прогноза прогноз на дневные часы
  getForecastDays(forecastList: List[], offset: number): List[] {
    let forecastDays: List[] = [];
    let hours: number;

    for (let forecast of forecastList) {
      let test = new Date(forecast.dt * 1000);
      hours = test.getUTCHours() + offset;
      if (hours < 0) hours += 24;
      else if (hours > 23) hours -= 24;
      if (hours === 12 || hours === 13 || hours === 14) forecastDays.push(forecast);
    }

    return forecastDays;
  }
  //Получаем из списка пятидневного прогноза прогноз на ночные часы
  getForecastNights(forecastList: List[], offset: number): List[] {
    let forecastNight: List[] = [];
    let hours: number;

    for (let forecast of forecastList) {
      let test = new Date(forecast.dt * 1000);
      hours = test.getUTCHours() + offset;
      if (hours < 0) hours += 24;
      else if (hours > 23) hours -= 24;
      if (hours === 0 || hours === 1 || hours === 2) forecastNight.push(forecast);
    }

    return forecastNight;
  }

  //Получаем прогноз на ближайшие 24 часа (интервал 3 часа)
  getForecastDay(forecastList: List[]): List[] {
    let forecastDay: List[] = [];
    let i: number = 0;

    while (i < 8) {
      forecastDay.push(forecastList[i++]);
    }

    return forecastDay;
  }

}
