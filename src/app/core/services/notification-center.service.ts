import { Injectable } from '@angular/core';

import { WeatherParamsPipe } from 'src/app/shared/pipes/weather-params.pipe';
import { WeatherData, List } from '../models';

@Injectable({
  providedIn: 'root',
})
export class NotificationCenterService {
  constructor(private weatherParamsPipe: WeatherParamsPipe) {}

  pressureNotify(
    weatherData: WeatherData,
    forecastData: List[],
  ): [List, number] {
    let delta: any;

    for (let i = 0; i !== forecastData.length; i++) {
      delta = this.weatherParamsPipe.transform(
        weatherData.main.pressure - forecastData[i].main.pressure,
        'pressure',
      );
      if (delta >= 10 || delta <= -10) {
        return [forecastData[i], delta];
      }
    }

    return null;
  }

  precipitationNotify(forecastData: List[]): List[] {
    const data: List[] = [];
    forecastData.forEach(day => {
      if (day.weather[0].id >= 200 && day.weather[0].id < 300) {
        // событие "гроза"
        data.push(day);
      } else if (day.weather[0].id >= 502 && day.weather[0].id < 600) {
        // событие "сильный дождь"
        data.push(day);
      } else if (day.weather[0].id === 602 || day.weather[0].id === 622) {
        // событие "сильный снегопад"
        data.push(day);
      }
    });

    return data;
  }

  tempNotify(temp: number, forecastData: List[]): [List, number] {
    for (let i = 0; i !== forecastData.length; i++) {
      const delta = temp - forecastData[i].main.temp;
      if (delta >= 5 || delta <= -5) {
        return [forecastData[i], delta];
      }
    }

    return null;
  }

  windNotify(forecastData: List[]): List {
    return forecastData.find(day => day.wind.speed > 13.8);
  }
}
