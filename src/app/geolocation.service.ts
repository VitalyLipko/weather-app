import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';

import { WeatherService } from './weather.service';

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
  private locationName:string;
  constructor(private weather: WeatherService, private router: Router, private lowerCasePipe: LowerCasePipe) { }

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
    this.weather.getWeatherDataByPosition(position.coords).subscribe(
      data => this.weather.saveWeatherData(data),
      () => console.error('Error in retrieving weather data.')
    );
    this.weather.getForecastDataByPosition(position.coords).subscribe(
      data => {
        this.weather.saveForecastData(data);
        this.locationName = data.city.name;
      },
      () => console.error('Error in retrieving forecast data.'),
      () => this.router.navigate([`${this.lowerCasePipe.transform(this.locationName)}`])
    );
  }

}
