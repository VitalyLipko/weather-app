import { Injectable } from '@angular/core';

import { WeatherService } from './weather.service';

export interface Position {
  latitude: number;
  longitude: number
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private weather: WeatherService) { }

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
        pos = position.coords;
        console.log((pos.latitude).toFixed(2) + '; ' + (pos.longitude).toFixed(2));
        this.weather.getCurrentWeatherData(pos).subscribe(
          (data) => console.log(`Temp: ${data.main.temp}`),
          () => console.error('Error in retrieving data.')
          );
      },
      (error) => console.error('Geolocation failure: ' + error.message),
      { timeout: 15000, maximumAge: 60000 }
    );

    return pos;
  }

}
