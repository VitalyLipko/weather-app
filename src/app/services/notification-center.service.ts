import { Injectable } from '@angular/core';

import { List } from './weather.service';
import { WeatherParamsPipe } from '../pipes/weather-params.pipe';

@Injectable({
  providedIn: 'root'
})
export class NotificationCenterService {

  constructor(private weatherParamsPipe: WeatherParamsPipe) { }

  pressureNotify(weatherData: List, forecastData: List[]): any {
    let delta: any;
    for (let i = 0; i !== forecastData.length; i++) {
      delta = this.weatherParamsPipe.transform(
        (weatherData.main.pressure - forecastData[i].main.pressure),
        'pressure'
      );
      if (delta >= 10 || delta <= -10) return [forecastData[i], delta];
    }
    return null;
  }

  precipitationNotify(forecastData: List[]): List[] {
    let data: List[] = [];
    forecastData.forEach(day => {
      if(day.weather[0].id >= 200 && day.weather[0].id < 300) data.push(day);//событие "гроза"
      else if(day.weather[0].id >= 502 && day.weather[0].id < 600) data.push(day);//событие "сильный дождь"
      else if(day.weather[0].id === 602 || day.weather[0].id === 622) data.push(day);//событие "сильный снегопад"
    });
    return data;
  }

  tempNotify(weatherData: List, forecastData: List[]): any {
    let delta: any;

    for (let i = 0; i !== forecastData.length; i++) {
      delta = weatherData.main.temp - forecastData[i].main.temp;
      if (delta >= 5 || delta <= -5) return [forecastData[i], delta];
    }
    return null;
  }

  windNotify(forecastData: List[]): any {
    for (let i = 0; i !== forecastData.length; i++) {
      if (forecastData[i].wind.speed > 13.8) return forecastData[i];
    }
    return null;
  }
}