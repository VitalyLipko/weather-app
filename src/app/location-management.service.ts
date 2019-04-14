import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService, WeatherData, GroupWeatherData } from './weather.service';
import { TimezoneService } from './timezone.service';

interface Locations {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationManagementService {
  isBookmark: boolean;
  locations: Locations[] = [];
  groupWeatherData: GroupWeatherData;
  constructor(private weather: WeatherService, private router: Router, private lowerCasePipe: LowerCasePipe,
    private timezone: TimezoneService) { }

  isLocationExist(name: string): boolean {
    if (this.locations.find(location => location.name === name)) return true;
    else return false;
  }

  isLocationsList(): boolean {
    if (this.router.url.substr(0, 10) === '/locations') return true;
    else return false;
  }

  manage(weatherData: WeatherData) {
    let location: Locations = {
      id: 0,
      name: ''
    };
    location.id = weatherData.id;
    location.name = weatherData.name;
    this.isBookmark = !this.isBookmark;
    if (this.isBookmark) {
      if (this.locations.length < 15) {
        this.locations.push(location);
        this.locations = this.locations.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        localStorage.setItem('locations', JSON.stringify(this.locations));
      } else this.isBookmark = false;
    } else {
      if (this.locations.length == 1) {
        this.locations = [];
        localStorage.removeItem('locations');
      } else {
        this.locations.splice(this.locations.findIndex(x => x.id === location.id), 1);
        localStorage.setItem('locations', JSON.stringify(this.locations));
      }
    }
  }

  getData(name: string) {
    this.weather.getWeatherDataByName(name).pipe(
      tap(
        weatherData => this.weather.saveWeatherData(weatherData),
        error => {
          console.error('Error in retrieving weather data.');
          this.weather.errorStatus = error.status;
          this.router.navigate(['/search']);
        }
      ),
      switchMap(() => this.weather.getForecastDataByName(name).pipe(
        tap(
          forecastData => {
            this.weather.saveForecastData(forecastData);
            if(this.router.url.substr(1, 9) === 'locations')
              this.router.navigate([`/locations/${this.lowerCasePipe.transform(forecastData.city.name)}`]);
            else this.router.navigate([`${this.lowerCasePipe.transform(forecastData.city.name)}`]);
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

  delete(name: string) {
    if (this.locations.length == 1) {
      this.locations = [];
      localStorage.removeItem('locations');
    } else {
      this.locations.splice(this.locations.findIndex(x => x.name === name), 1);
      localStorage.setItem('locations', JSON.stringify(this.locations));
      this.groupWeatherData.list.splice(
        this.groupWeatherData.list.findIndex(list => list.name === name), 1
      );
      --this.groupWeatherData.cnt;
    }
  }
}