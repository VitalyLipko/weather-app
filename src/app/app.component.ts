import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService } from './weather.service';
import { TimezoneService } from './timezone.service';
import { GeolocationService } from './geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nameLocation = new FormControl('', [Validators.minLength(2), Validators.required]);

  constructor(public weather: WeatherService, private router: Router,
    private lowerCasePipe: LowerCasePipe, private timezone: TimezoneService, public geolocation: GeolocationService) { }

  search() {
    this.weather.getWeatherDataByName(this.nameLocation.value).pipe(
      tap(
        weatherData => this.weather.saveWeatherData(weatherData),
        error => {
          console.error('Error in retrieving weather data.');
          this.weather.errorStatus = error.status;
          this.router.navigate(['/search']);
        }
      ),
      switchMap(() => this.weather.getForecastDataByName(this.nameLocation.value).pipe(
        tap(
          forecastData => {
            this.weather.saveForecastData(forecastData);
            this.router.navigate([`${this.lowerCasePipe.transform(forecastData.city.name)}`]);
            this.nameLocation.setValue('');
          },
          error => {
            console.error('Error in retrieving forecast data.');
            this.weather.errorStatus = error.status;
          }
        ),
        switchMap(forecastData => this.timezone.getTimezone(forecastData.city.coord))
      ))
    ).subscribe(
      timezoneData => this.timezone.saveTimezoneDataStorage(timezoneData),
      () => console.error('Error in retrieving timezone data.')
    );
  }

  searchByEnter() {
    if (this.nameLocation.valid) this.search();
  }
}
