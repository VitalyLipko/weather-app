import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Position } from './geolocation.service';

const API_KEY = 'f25ad0c5cec3176c83ad8d9daddb8fe2';

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

interface UrlAPI {
  weather: string;
  forecast: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private urlAPI: UrlAPI = {
    weather: 'https://api.openweathermap.org/data/2.5/weather?',
    forecast: 'https://api.openweathermap.org/data/2.5/forecast?'
  }
  weatherDataStorage: WeatherData;
  forecastDataStorage: ForecastData;
  constructor(private http: HttpClient) { }

  getWeatherData(position: Position): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.urlAPI.weather}lat=${(position.latitude).toFixed(2)}&lon=${(position.longitude).toFixed(2)}&units=metric&lang=ru&appid=${API_KEY}`
    ).pipe(retry(3), catchError(this.handleError));
  }

  getForecastData(position: Position): Observable<ForecastData> {
    return this.http.get<ForecastData>(
      `${this.urlAPI.forecast}lat=${(position.latitude).toFixed(2)}&lon=${(position.longitude).toFixed(2)}&units=metric&lang=ru&appid=${API_KEY}`
    ).pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status} ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getWeatherDataStorage(): Observable<WeatherData> {
    return of(this.weatherDataStorage);
  }

  getForecastDataStorage(): Observable<ForecastData> {
    return of(this.forecastDataStorage);
  }

  saveWeatherData(data: WeatherData) {
    this.weatherDataStorage = data;
  }

  saveForecastData(data: ForecastData) {
    this.forecastDataStorage = data;
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

  //Получаем прогноз на ближайшие 24 часа
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
