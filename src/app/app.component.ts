import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService } from './services/weather.service';
import { GeolocationService } from './services/geolocation.service';
import { inputAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [inputAnimation]
})
export class AppComponent {
  nameLocation = new FormControl('', [Validators.minLength(2), Validators.required]);
  isExpanded: boolean = false;
  @ViewChild('inputRef', { static: true })
  searchFormEl: ElementRef;
  isBgTransparent: boolean = true;
  isShowed = true;
  constructor(
    public weather: WeatherService,
    private router: Router,
    private lowerCasePipe: LowerCasePipe,
    public geolocation: GeolocationService
  ) { }

  search() {
    this.weather.isDataLoaded = false;
    this.weather.getWeatherDataByName(this.nameLocation.value).pipe(
      tap(
        weatherData => {
          this.weather.saveWeatherData(weatherData);
          this.nameLocation.setValue('');
        },
        error => {
          console.error(error.message);
          this.weather.errorStatus = error.error.status;
          this.nameLocation.setValue('');
          this.weather.isDataLoaded = true;
          this.router.navigate(['/search']);
        }
      ),
      switchMap(weatherData => this.weather.getForecastDataByName(weatherData.name).pipe(
        tap(
          forecastData => {
            this.weather.saveForecastData(forecastData);
            this.weather.isDataLoaded = true;
            this.router.navigate([`${this.lowerCasePipe.transform(forecastData.city.name)}`]);
          },
          error => {
            console.error(error.message);
            this.weather.errorStatus = error.error.status;
            this.nameLocation.setValue('');
            this.weather.isDataLoaded = true;
            this.router.navigate(['/search']);
          }
        ),
        switchMap(forecastData => this.weather.getCycleWeatherData({
          latitude: forecastData.city.coord.lat,
          longitude: forecastData.city.coord.lon
        }))
      ))
    ).subscribe(
      cycleWeatherData => this.weather.saveCycleWeatherData(cycleWeatherData),
      error => console.error(error.message)
    );
  }

  searchByEnter() {
    if (this.nameLocation.valid) {
      this.search();
      this.searchFormEl.nativeElement.blur();
    }
  }

  expandCollapse() {
    this.isExpanded = !this.isExpanded;
  }

  @HostListener('window:scroll') scrlHndlr() {
    this.calcScrollPos();
  }

  private calcScrollPos() {
    let pageY = window.pageYOffset || document.documentElement.scrollTop;

    if (pageY > 18) this.isBgTransparent = false;
    else this.isBgTransparent = true;
  }

  controlNavbar() {
    if (!this.isExpanded && !this.isShowed) this.isShowed = true;
  }
}
