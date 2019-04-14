import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService, WeatherData, ForecastData, List } from '../weather.service';
import { LocationManagementService } from '../location-management.service';
import { TimezoneService, TimezoneData } from '../timezone.service';


@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  //weatherData$: Observable<WeatherData>;
  weatherData: WeatherData;
  forecastData: ForecastData;
  forecastDays: List[];
  forecastNights: List[];
  forecastDay: List[];
  timezoneOffset: string;
  private subscriptions: Subscription = new Subscription();

  weatherData$: Observable<WeatherData>;
  forecastData$: Observable<ForecastData>;
  timezoneData$: Observable<TimezoneData>;
  @HostListener('window:load') getNewData() {
    this.locationManagement.getData(sessionStorage.getItem('name'));
  }
  
  constructor(public weather: WeatherService, public locationManagement: LocationManagementService,
    public timezone: TimezoneService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.weather.weatherDataStorage$.pipe(
        tap(weatherData => {
          this.weatherData = weatherData;
          if (localStorage.getItem('locations'))
            this.locationManagement.locations = JSON.parse(localStorage.getItem('locations'));
          this.locationManagement.isBookmark = this.locationManagement.isLocationExist(weatherData.name);
          sessionStorage.setItem('name', weatherData.name);
        }),
        switchMap(() => this.weather.forecastDataStorage$.pipe(
          tap(forecastData => this.forecastData = forecastData),
          switchMap(() => this.timezone.timezoneDataStorage$)
        ))
      ).subscribe(
        timezoneData => {
          if (timezoneData.gmtOffset >= 0) this.timezoneOffset = '+' + (timezoneData.gmtOffset / 3600).toString();
          else this.timezoneOffset = (timezoneData.gmtOffset / 3600).toString();
          this.weather.forecastTz = timezoneData.gmtOffset / 3600;
          this.forecastDays = this.weather.getForecastDays(this.forecastData.list, this.weather.forecastTz);
          this.forecastNights = this.weather.getForecastNights(this.forecastData.list, this.weather.forecastTz);
          this.forecastDay = this.weather.getForecastDay(this.forecastData.list);
        }
      )
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }

  next() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i !== (this.locationManagement.locations.length - 1))
      this.locationManagement.getData(this.locationManagement.locations[++i].name);
    else this.locationManagement.getData(this.locationManagement.locations[0].name);
  }

  previous() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i === 0) this.locationManagement.getData(this.locationManagement.locations[i].name);
    else this.locationManagement.getData(this.locationManagement.locations[--i].name);
  }

  selectedIndex(): number {
    return this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
  }
}