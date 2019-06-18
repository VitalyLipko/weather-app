import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Position } from './geolocation.service';

const apiKey = 'f25ad0c5cec3176c83ad8d9daddb8fe2';

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  wind: Wind;
  clouds: Clouds;
  rain: Rain;
  snow: Snow;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  cod: number;
  message: number;
  city: City;
  cnt: number;
  list: List[];
}

export interface GroupWeatherData {
  cnt: number;
  list: WeatherData[];
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  rain: number;
  snow: number;
  dt_txt: string;
}

export interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface Rain {
  one_h: number;
  three_h: number;
}

interface Snow {
  one_h: number;
  three_h: number;
}

interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface UrlApi {
  readonly weather: string;
  readonly forecast: string;
  readonly group: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private urlApi: UrlApi = {
    weather: 'https://api.openweathermap.org/data/2.5/weather?',
    forecast: 'https://api.openweathermap.org/data/2.5/forecast?',
    group: 'https://api.openweathermap.org/data/2.5/group?'
  }

  private weatherDataStorage = new ReplaySubject<WeatherData>(1, 2000);
  private forecastDataStorage = new ReplaySubject<ForecastData>(1, 2000);
  weatherDataStorage$ = this.weatherDataStorage.asObservable();
  forecastDataStorage$ = this.forecastDataStorage.asObservable();
  private _errorStatus = new ReplaySubject<number>(1, 2000);
  errorStatus$ = this._errorStatus.asObservable();
  forecastTz: number;
  private _isDataLoaded = new ReplaySubject<boolean>(1, 2000);
  isDataLoaded$ = this._isDataLoaded.asObservable();
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
    ).pipe(retry(2), catchError(this.handleError));
  }

  getForecastDataByPosition(position: Position): Observable<ForecastData> {
    return this.http.get<ForecastData>(
      `${this.urlApi.forecast}lat=${(position.latitude).toFixed(2)}&lon=${(position.longitude).toFixed(2)}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retry(2), catchError(this.handleError));
  }

  getWeatherDataByName(name: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.urlApi.weather}q=${name}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retry(2), catchError(this.handleError));
  }

  getForecastDataByName(name: string): Observable<ForecastData> {
    return this.http.get<ForecastData>(
      `${this.urlApi.forecast}q=${name}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retry(2), catchError(this.handleError));
  }

  getGroupWeatherData(idList: string): Observable<GroupWeatherData> {
    return this.http.get<GroupWeatherData>(
      `${this.urlApi.group}id=${idList}&units=metric&lang=ru&appid=${apiKey}`
    ).pipe(retry(1), catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`Openweathermap API returned code ${error.status} ` + `body was: ${error.error}`);
    }
    return throwError(error);
  }

  saveWeatherData(data: WeatherData) {
    this.weatherDataStorage.next(data);
  }

  saveForecastData(data: ForecastData) {
    this.forecastDataStorage.next(data);
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
