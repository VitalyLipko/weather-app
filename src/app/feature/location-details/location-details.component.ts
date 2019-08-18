import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { bookmarkAnimation, notifyAnimation, notificationCenterAnimation } from 'src/app/root/animations';
import { WeatherService } from 'src/app/core/services/weather.service';
import { LocationManagementService } from 'src/app/core/services/location-management.service';
import { TagService } from 'src/app/core/services/tag.service';
import { WeatherData } from 'src/app/core/models/weather-data.model';
import { ForecastData } from 'src/app/core/models/forecast-data.model';
import { CycleWeatherData } from 'src/app/core/models/cycle-weather-data.model';
import { List } from 'src/app/core/models/list.model';

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
  private subscriptions = new Subscription();
  isDataLoaded$: Observable<boolean>;
  isShown = false;
  isOpenedNotificationCenter = false;
  ringing: boolean;
  private timerIdNotify;
  selectedIndex: number;

  @HostListener('window:load') getNewData() {
    const id = Number(localStorage.getItem('lastId'));
    if (id) this.locationManagement.getData(id);
    else this.router.navigate(['/search']);
  }

  constructor(
    public weather: WeatherService,
    public locationManagement: LocationManagementService,
    private seo: TagService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    this.isDataLoaded$ = this.weather.isDataLoaded$;
    this.subscriptions.add(
      this.weather.weatherDataStorage$.pipe(
        switchMap(weatherData => {
          this.closeNotify();
          window.scrollTo(0, 0);
          this.weatherData = weatherData;
          if (localStorage.getItem('locations')) {
            this.locationManagement.locations = JSON.parse(localStorage.getItem('locations'));
          }
          this.locationManagement.isBookmark = this.locationManagement.isLocationExist(weatherData.name);
          this.seo.setPageTitle('Weather App | Прогноз погоды в ' + weatherData.name);
          this.seo.setPageDescription('Прогноз текущей погоды, почасовой и пятидневный.');
          this.seo.setMetaRobots('index, follow');
          localStorage.setItem('lastId', weatherData.id.toString());

          return this.weather.forecastDataStorage$.pipe(
            switchMap(forecastData => {
              if (this.weatherData.timezone >= 0) this.timezoneOffset = '+' + (this.weatherData.timezone / 3600).toString();
              else this.timezoneOffset = (this.weatherData.timezone / 3600).toString();
              this.weather.forecastTz = this.weatherData.timezone / 3600;
              this.forecastData = forecastData;
              this.forecastDay = this.weather.getForecastDay(forecastData.list);
              this.forecastDays = this.weather.getForecastDays(this.forecastData.list, this.weather.forecastTz);
              this.forecastNights = this.weather.getForecastNights(this.forecastData.list, this.weather.forecastTz);
              this.selectedIndex = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);

              return this.weather.cycleWeatherDataStorage$;
            })
          );
        })
      ).subscribe(cycleWeatherData => this.cycleWeatherData = cycleWeatherData)
    );
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
    this.scrollState(this.isOpenedNotificationCenter);
  }

  previous() {
    let i = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
    if (i === -1) i = 0;
    if (i === 0)
      this.locationManagement.getData(this.locationManagement.locations[this.locationManagement.locations.length - 1].id);
    else this.locationManagement.getData(this.locationManagement.locations[--i].id);
    this.isOpenedNotificationCenter = false;
    this.scrollState(this.isOpenedNotificationCenter);
  }

  changeState() {
    this.locationManagement.manage(this.weatherData);
    this.selectedIndex = this.locationManagement.locations.findIndex(x => x.name === this.weatherData.name);
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
    this.scrollState(this.isOpenedNotificationCenter);
  }

  openLocation(id: number) {
    this.isOpenedNotificationCenter = false;
    this.scrollState(this.isOpenedNotificationCenter);
    this.locationManagement.getData(id);
  }

  private scrollState(state: boolean) {
    if (state) this.renderer.addClass(document.body, 'show-notification-center');
    else this.renderer.removeClass(document.body, 'show-notification-center');
  }
}