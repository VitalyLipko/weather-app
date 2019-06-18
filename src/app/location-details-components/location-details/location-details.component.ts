import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService, WeatherData, ForecastData, List } from '../../services/weather.service';
import { LocationManagementService } from '../../services/location-management.service';
import { TimezoneService, TimezoneData } from '../../services/timezone.service';
import { TagService } from 'src/app/services/tag.service';
import { bookmarkAnimation, notifyAnimation, notificationCenterAnimation } from 'src/app/animations';


@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  animations: [bookmarkAnimation, notifyAnimation, notificationCenterAnimation]
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
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
  isDataLoaded$: Observable<boolean>;
  isShown: boolean = false;
  isOpenedNotificationCenter: boolean = false;
  ringing: boolean;
  private timerIdNotify;

  @HostListener('window:load') getNewData() {
    this.locationManagement.getData(sessionStorage.getItem('name'));
  }

  constructor(
    public weather: WeatherService,
    public locationManagement: LocationManagementService,
    public timezone: TimezoneService,
    private seo: TagService
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.weather.weatherDataStorage$.pipe(
        tap(weatherData => {
          this.weatherData = weatherData;
          if (localStorage.getItem('locations'))
            this.locationManagement.locations = JSON.parse(localStorage.getItem('locations'));
          this.locationManagement.isBookmark = this.locationManagement.isLocationExist(weatherData.name);
          this.seo.setPageTitle('Weather App | Прогноз погоды в ' + weatherData.name);
          this.seo.setPageDescription('Прогноз текущей погоды, почасовой и пятидневный.');
          this.seo.setMetaRobots('index, follow');
          sessionStorage.setItem('name', weatherData.name);
        }),
        switchMap(() => this.weather.forecastDataStorage$.pipe(
          tap(forecastData => {
            this.forecastData = forecastData;
            this.forecastDay = this.weather.getForecastDay(forecastData.list);
          }),
          switchMap(() => this.timezone.timezoneDataStorage$)
        ))
      ).subscribe(
        timezoneData => {
          if (timezoneData.gmtOffset >= 0) this.timezoneOffset = '+' + (timezoneData.gmtOffset / 3600).toString();
          else this.timezoneOffset = (timezoneData.gmtOffset / 3600).toString();
          this.weather.forecastTz = timezoneData.gmtOffset / 3600;
          this.forecastDays = this.weather.getForecastDays(this.forecastData.list, this.weather.forecastTz);
          this.forecastNights = this.weather.getForecastNights(this.forecastData.list, this.weather.forecastTz);
          this.weather.isDataLoaded = true;
        }
      )
    );
    this.isDataLoaded$ = this.weather.isDataLoaded$;
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    if (this.subscriptions) this.subscriptions.unsubscribe();
    if (this.timerIdNotify) clearTimeout(this.timerIdNotify);
  }

  next() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i !== (this.locationManagement.locations.length - 1))
      this.locationManagement.getData(this.locationManagement.locations[++i].name);
    else this.locationManagement.getData(this.locationManagement.locations[0].name);
    this.isOpenedNotificationCenter = false;
  }

  previous() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i === 0)
      this.locationManagement.getData(this.locationManagement.locations[this.locationManagement.locations.length - 1].name);
    else this.locationManagement.getData(this.locationManagement.locations[--i].name);
    this.isOpenedNotificationCenter = false;
  }

  selectedIndex(): number {
    return this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
  }

  changeState() {
    this.locationManagement.manage(this.weatherData);
    this.isShown = !this.isShown;
    if (this.timerIdNotify) clearTimeout(this.timerIdNotify);
    if (!this.isShown) this.isShown = true;
    this.timerIdNotify = setTimeout(() => {
      this.closeNotify();
    }, 5000);
  }

  closeNotify() {
    this.isShown = false;
    clearTimeout(this.timerIdNotify);
  }

  onClick() {
     this.isOpenedNotificationCenter = !this.isOpenedNotificationCenter;
  }
}