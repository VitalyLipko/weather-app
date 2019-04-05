import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService, WeatherData, ForecastData, List } from '../weather.service';
import { LocationManagementService } from '../location-management.service';

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
  constructor(public weather: WeatherService, public locationManagement: LocationManagementService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.weather.weatherDataStorage$.subscribe(weatherData => {
        this.weatherData = weatherData;
        if (localStorage.getItem('locations'))
          this.locationManagement.locations = JSON.parse(localStorage.getItem('locations'));
        this.locationManagement.isBookmark = this.locationManagement.isLocationExist(this.weatherData.name);
        sessionStorage.setItem('weatherData', JSON.stringify(weatherData));
      })
    );
    this.subscriptions.add(
      this.weather.forecastDataStorage$.subscribe(forecastData => {
        this.forecastData = forecastData;
        sessionStorage.setItem('forecastData', JSON.stringify(forecastData));
        this.forecastDays = this.weather.getForecastDays(this.forecastData.list);
        this.forecastNights = this.weather.getForecastNight(forecastData.list);
        this.forecastDay = this.weather.getForecastDay(forecastData.list);
      })
    );
    if (sessionStorage.getItem('weatherData'))
      this.weatherData = JSON.parse(sessionStorage.getItem('weatherData'));
    if (sessionStorage.getItem('forecastData')) {
      this.forecastData = JSON.parse(sessionStorage.getItem('forecastData'));
      this.forecastDays = this.weather.getForecastDays(this.forecastData.list);
      this.forecastNights = this.weather.getForecastNight(this.forecastData.list);
      this.forecastDay = this.weather.getForecastDay(this.forecastData.list);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    sessionStorage.removeItem('weatherData');
    sessionStorage.removeItem('forecastData');
  }

  next() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i !== (this.locationManagement.locations.length - 1)) {
      this.locationManagement.show(this.locationManagement.locations[++i].name);
    } else {
      this.locationManagement.show(this.locationManagement.locations[0].name);
    }
  }

  previous() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i === 0) {
      this.locationManagement.show(this.locationManagement.locations[i].name);
    } else {
      this.locationManagement.show(this.locationManagement.locations[--i].name);
    }
  }

  selectedIndex(): number {
    return this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
  }
}