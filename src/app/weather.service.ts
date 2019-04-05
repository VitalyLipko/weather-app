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
  dt_txt: number;
}

interface Coord {
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

  private weatherDataStorage = new ReplaySubject<WeatherData>(1);
  private forecastDataStorage = new ReplaySubject<ForecastData>(1);
  weatherDataStorage$ = this.weatherDataStorage.asObservable();
  forecastDataStorage$ = this.forecastDataStorage.asObservable();
  errorStatus: number;

  constructor(private http: HttpClient) { }

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
      console.error(`Backend returned code ${error.status} ` + `body was: ${error.error}`);
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
  getForecastDays(forecastList: List[]): List[] {
    let forecastDays: List[] = [];
    let hours: string;

    for (let forecast of forecastList) {
      hours = this.fromUnixToHours(forecast.dt);
      if (hours === "12:00" || hours === "13:00" || hours === "14:00") forecastDays.push(forecast);
    }

    return forecastDays;
  }
  //Получаем из списка пятидневного прогноза прогноз на ночные часы
  getForecastNight(forecastList: List[]): List[] {
    let forecastNight: List[] = [];
    let hours: string;

    for (let forecast of forecastList) {
      hours = this.fromUnixToHours(forecast.dt);
      if (hours === "0:00" || hours === "01:00" || hours === "02:00") forecastNight.push(forecast);
    }

    return forecastNight;
  }

  //Получаем прогноз на ближайшие 24 часа (интервал 3 часа)
  getForecastDay(forecastList: List[]): List[] {
    let forecastDay: List[] = [];
    let i: number = 0;

    while(i < 8) {
      forecastDay.push(forecastList[i++]);
    }

    return forecastDay;
  }

  //Переводим метеорологические градусы (азимут точки, откуда дует ветер) в направление
  fromGradToDir(grad: number): string {
    if (grad === 0) return "С";
    else if (grad > 0 && grad < 90) return "СВ";
    else if (grad === 90) return "С";
    else if (grad > 90 && grad < 180) return "ЮВ";
    else if (grad === 180) return "Ю";
    else if (grad > 180 && grad < 270) return "ЮЗ";
    else if (grad === 270) return "З";
    else if (grad > 270 && grad < 360) return "СЗ";
  }

  //Переводим значение атмосферного давления из гПа в мм.рт.ст.
  fromPaToHg(pressure: number): number {
    return (pressure * 0.75006)//0.75006 - эквивалент 1 гПа в мм.рт.ст.
  }

  //Переводим UNIX-время в часы и минуты
  fromUnixToHours(unix: number): string {
    let date = new Date(unix * 1000);//unix-время дано в секундах, поэтому приводим к миллисекундам
    let hours: string, minutes: string;

    if (date.getHours() < 10) hours = '0' + date.getHours().toString();
    else hours = date.getHours().toString();
    if (date.getMinutes() < 10) minutes = '0' + date.getMinutes().toString();
    else minutes = date.getMinutes().toString();

    return (hours + ':' + minutes);
  }
  //Переводим UNIX-время в день недели
  fromUnixToDayOfWeek(unix: number): string {
    let daysOfWeek: string[] = ['вск', 'пн', 'вт', 'ср', 'чт', 'пт', 'cб'];
    let date = new Date(unix * 1000);

    return daysOfWeek[date.getDay()];
  }
  //Переводим UNIX-время в месяц
  fromUnixToMonth(unix: number): string {
    let months: string[] = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'];
    let date = new Date(unix * 1000);

    return months[date.getMonth()];
  }
  //Переводим UNIX-время в день месяца
  fromUnixToDayOfMonth(unix: number): number {
    let date = new Date(unix * 1000);

    return date.getDate();
  }
}
