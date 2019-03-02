import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Position } from './geolocation.service';

const API_KEY = 'f25ad0c5cec3176c83ad8d9daddb8fe2';

interface CurrentWeatherData {
  coord: Coord;
  weather: Weather;
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
}
