import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService } from './weather.service';
import { TimezoneService } from './timezone.service';

export interface Position {
  latitude: number;
  longitude: number
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  readonly permissionDenied = 1;
  readonly positionUnavaliable = 2;
  readonly timeout = 3;
  errorCode: number;

  constructor(private weather: WeatherService, private router: Router, private lowerCasePipe: LowerCasePipe,
    private timezone: TimezoneService) { }

  isAvailable(): boolean {
    if ('geolocation' in navigator) return true;
    return false;
  }

  getCurrentPosition(): Position {
    let pos: Position = {
      latitude: 0,
      longitude: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.successPosition(position),
      (error) => {
        console.error('Geolocation failure: ' + error.message);
        this.errorCode = error.code;
        //this.router.navigate(['search']);
      },
      { timeout: 15000, maximumAge: 600000 }
    );

    return pos;
  }

  successPosition(position) {
    this.errorCode = 0;
    this.weather.getWeatherDataByPosition(position.coords).pipe(
      tap(
        weatherData => this.weather.saveWeatherData(weatherData),
        error => {
          console.error('Error in retrieving weather data.');
          this.weather.errorStatus = error.status;
        }
      ),
      switchMap(() => this.weather.getForecastDataByPosition(position.coords).pipe(
        tap(
          forecastData => {
            this.weather.saveForecastData(forecastData);
            this.router.navigate([`${this.lowerCasePipe.transform(forecastData.city.name)}`])
          },
          error => {
            console.error('Error in retrieving forecast data.');
            this.weather.errorStatus = error.status;
            this.router.navigate(['/search']);
          }
        ),
        switchMap((forecastData) => this.timezone.getTimezone(forecastData.city.coord))
      ))
    ).subscribe(
      timezoneData => this.timezone.saveTimezoneDataStorage(timezoneData),
      () => console.error('Error in retrieving timezone data.')
    );
  }
}
