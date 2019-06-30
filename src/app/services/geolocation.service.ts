import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService } from './weather.service';
import { ReplaySubject } from 'rxjs';

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
  private _errorCode = new ReplaySubject<number>(1, 2000);
  errorCode$ = this._errorCode.asObservable();

  constructor(
    private weather: WeatherService,
    private router: Router,
    private lowerCasePipe: LowerCasePipe
  ) { }

  set errorCode(code: number) {
    this._errorCode.next(code);
  }

  isAvailable(): boolean {
    if ('geolocation' in navigator) return true;
    return false;
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.successPosition(position),
      (error) => {
        console.error('Geolocation failure: ' + error.message);
        this.errorCode = error.code;
        this.router.navigate(['/search']);
      },
      { timeout: 15000, maximumAge: 600000 }
    );
  }

  successPosition(position) {
    this.errorCode = 0;
    this.weather.isDataLoaded = false;
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
        switchMap(() => this.weather.getCycleWeatherData(position.coords))
      ))
    ).subscribe(
      cycleWeatherData => this.weather.saveCycleWeatherData(cycleWeatherData),
      () => console.error('Error in retrieving cycle weather data.')
    );
  }
}
