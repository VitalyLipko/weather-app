import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Position } from './geolocation.service';

const API_KEY = 'f25ad0c5cec3176c83ad8d9daddb8fe2';

export interface CurrentWeatherData {
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


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = 'https://api.openweathermap.org/data/2.5/weather?';
  currentWeatherDataStorage: CurrentWeatherData;
  constructor(private http: HttpClient) { }

  getCurrentWeatherData(position: Position): Observable<CurrentWeatherData> {
    return this.http.get<CurrentWeatherData>(
      `${this.url}lat=${(position.latitude).toFixed(2)}&lon=${(position.longitude).toFixed(2)}&units=metric&lang=ru&appid=${API_KEY}`
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

  getCurrentWeatherDataStorage(): Observable<CurrentWeatherData> {
    return of(this.currentWeatherDataStorage);
  }

  saveCurrentWeatherData(data: CurrentWeatherData) {
    this.currentWeatherDataStorage = data;
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

  //Переводим UNIX-время в обычную дату
  fromUnixToDate(unix: number): string {
    let date = new Date(unix * 1000);//unix-время дано в миллисекундах, поэтому приводим к секундам
    let hours: string, minutes: string;
    
    if(date.getHours() < 10) hours = '0' + date.getHours().toString();
    else  hours = date.getHours().toString();
    if(date.getMinutes() < 10) minutes = '0' + date.getMinutes().toString();
    else  minutes = date.getMinutes().toString();

    return (hours + ':' + minutes);
  }
}
