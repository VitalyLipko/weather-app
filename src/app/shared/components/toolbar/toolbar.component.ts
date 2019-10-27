import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { tap, switchMap } from 'rxjs/operators';

import { WeatherService } from 'src/app/core/services/weather.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { inputAnimation } from 'src/app/root/animations';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [inputAnimation]
})
export class ToolbarComponent implements OnInit {
  nameLocation = new FormControl('', [Validators.minLength(2), Validators.required]);
  isExpanded = false;
  isBgTransparent = true;
  isShowed = true;

  @HostListener('window:scroll') scrlHndlr() {
    this.calcScrollPos();
  }

  constructor(
    public weather: WeatherService,
    private router: Router,
    private lowerCasePipe: LowerCasePipe,
    public geolocation: GeolocationService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

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
      this.renderer.selectRootElement('#input-search').blur();
    }
  }

  expandCollapse() {
    this.isExpanded = !this.isExpanded;
  }

  private calcScrollPos() {
    const pageY = window.pageYOffset || document.documentElement.scrollTop;
    this.isBgTransparent = !!(pageY < 18);
  }

  controlNavbar() {
    this.isShowed = !this.isExpanded && !this.isShowed;
  }

}
