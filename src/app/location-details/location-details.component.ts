import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService, WeatherData, ForecastData, List } from '../weather.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  weatherData: WeatherData;
  forecastData: ForecastData;
  forecastDays: List[];
  forecastNights: List[];
  forecastDay: List[];
  private subscriptions: Subscription = new Subscription();
  constructor(public weather: WeatherService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.weather.weatherDataStorage$.subscribe(weatherData => {
        this.weatherData = weatherData;
        sessionStorage.setItem("weatherData", JSON.stringify(weatherData));
      })
    );
    this.subscriptions.add(
      this.weather.forecastDataStorage$.subscribe(forecastData => {
        this.forecastData = forecastData;
        sessionStorage.setItem("forecastData", JSON.stringify(forecastData));
        this.forecastDays = this.weather.getForecastDays(this.forecastData.list);
        this.forecastNights = this.weather.getForecastNight(forecastData.list);
        this.forecastDay = this.weather.getForecastDay(forecastData.list);
      })
    );
    if (sessionStorage.getItem("weatherData") !== " ")
      this.weatherData = JSON.parse(sessionStorage.getItem("weatherData"));
    if (sessionStorage.getItem("forecastData") !== " ") {
      this.forecastData = JSON.parse(sessionStorage.getItem("forecastData"));
      this.forecastDays = this.weather.getForecastDays(this.forecastData.list);
      this.forecastNights = this.weather.getForecastNight(this.forecastData.list);
      this.forecastDay = this.weather.getForecastDay(this.forecastData.list);  
    }
          
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    sessionStorage.removeItem("weatherData");
    sessionStorage.removeItem("forecastData");
  }
}
