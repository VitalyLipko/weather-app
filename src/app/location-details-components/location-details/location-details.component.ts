import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService, WeatherData, ForecastData, List, CycleWeatherData } from '../../services/weather.service';
import { LocationManagementService } from '../../services/location-management.service';
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
  cycleWeatherData: CycleWeatherData;
  forecastDays: List[];
  forecastNights: List[];
  forecastDay: List[];
  timezoneOffset: string;
  private subscriptions: Subscription = new Subscription();
  isDataLoaded$: Observable<boolean>;
  isShown = false;
  isOpenedNotificationCenter = false;
  ringing: boolean;
  private timerIdNotify;

  @HostListener('window:load') getNewData() {
    this.locationManagement.getData(Number(sessionStorage.getItem('id')));
  }

  constructor(
    public weather: WeatherService,
    public locationManagement: LocationManagementService,
    private seo: TagService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.weather.weatherDataStorage$.pipe(
        tap(weatherData => {
          this.closeNotify();
          window.scrollTo(0, 0);
          this.weatherData = weatherData;
          if (localStorage.getItem('locations'))
            this.locationManagement.locations = JSON.parse(localStorage.getItem('locations'));
          this.locationManagement.isBookmark = this.locationManagement.isLocationExist(weatherData.name);
          this.seo.setPageTitle('Weather App | Прогноз погоды в ' + weatherData.name);
          this.seo.setPageDescription('Прогноз текущей погоды, почасовой и пятидневный.');
          this.seo.setMetaRobots('index, follow');
          sessionStorage.setItem('id', weatherData.id.toString());
        }),
        switchMap(() => this.weather.forecastDataStorage$.pipe(
          tap(forecastData => {
            if (this.weatherData.timezone >= 0) this.timezoneOffset = '+' + (this.weatherData.timezone / 3600).toString();
            else this.timezoneOffset = (this.weatherData.timezone / 3600).toString();
            this.weather.forecastTz = this.weatherData.timezone / 3600;
            this.forecastData = forecastData;
            this.forecastDay = this.weather.getForecastDay(forecastData.list);
            this.forecastDays = this.weather.getForecastDays(this.forecastData.list, this.weather.forecastTz);
            this.forecastNights = this.weather.getForecastNights(this.forecastData.list, this.weather.forecastTz);
          }),
          switchMap(() => this.weather.cycleWeatherDataStorage$)
        ))
      ).subscribe(cycleWeatherData => this.cycleWeatherData = cycleWeatherData)
    );
    this.isDataLoaded$ = this.weather.isDataLoaded$;
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    if (this.subscriptions) this.subscriptions.unsubscribe();
    if (this.timerIdNotify) clearTimeout(this.timerIdNotify);
    if (this.isOpenedNotificationCenter) this.renderer.removeClass(document.body, 'show-notification-center');
  }

  next() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i !== (this.locationManagement.locations.length - 1))
      this.locationManagement.getData(this.locationManagement.locations[++i].id);
    else this.locationManagement.getData(this.locationManagement.locations[0].id);
    this.isOpenedNotificationCenter = false;
  }

  previous() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i === 0)
      this.locationManagement.getData(this.locationManagement.locations[this.locationManagement.locations.length - 1].id);
    else this.locationManagement.getData(this.locationManagement.locations[--i].id);
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
    if (this.isOpenedNotificationCenter) this.renderer.addClass(document.body, 'show-notification-center');
    else this.renderer.removeClass(document.body, 'show-notification-center');
  }
}