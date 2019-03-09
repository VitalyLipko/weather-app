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
      (position) => {
        this.weather.getCurrentWeatherData(position.coords).subscribe(
          (data) => {
            this.weather.saveCurrentWeatherData(data);
            this.router.navigate([`${this.lowerCasePipe.transform(data.name)}`]);
          },
          () => console.error('Error in retrieving data.')
        );
      },
      (error) => console.error('Geolocation failure: ' + error.message),
      { timeout: 15000, maximumAge: 600000 }
    );

    return pos;
  }

}
