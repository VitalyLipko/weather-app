import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService } from './weather.service';
import { GroupWeatherData } from '../models/group-weather-data.model';
import { WeatherData } from '../models/weather-data.model';

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

  constructor(
    private weather: WeatherService,
    private router: Router,
    private lowerCasePipe: LowerCasePipe
  ) { }

  isLocationExist(name: string): boolean {
    return !!this.locations.find(location => location.name === name);
  }

  enablePagination(): boolean {
    return (this.router.url.substr(0, 10) === '/locations' && this.locations.length > 1);
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

  getData(id: number) {
    if (!id) return;
    this.weather.isDataLoaded = false;
    this.weather.getWeatherDataById(id).pipe(
      tap(
        weatherData => this.weather.saveWeatherData(weatherData),
        error => {
          console.error(error.message);
          this.weather.errorStatus = error.error.status;
          this.weather.isDataLoaded = true;
          this.router.navigate(['/search']);
        }
      ),
      switchMap(() => this.weather.getForecastDataById(id).pipe(
        tap(
          forecastData => {
            this.weather.saveForecastData(forecastData);
            this.weather.isDataLoaded = true;
            if (this.router.url.substr(1, 9) === 'locations' && this.isLocationExist(forecastData.city.name))
              this.router.navigate([`/locations/${this.lowerCasePipe.transform(forecastData.city.name)}`]);
            else this.router.navigate([`${this.lowerCasePipe.transform(forecastData.city.name)}`]);
          },
          error => {
            console.error(error.message);
            this.weather.errorStatus = error.error.status;
            this.weather.isDataLoaded = true;
            this.router.navigate(['/search']);
          }
        ),
        switchMap(forecastData => this.weather.getCycleWeatherData(
          {
            latitude: forecastData.city.coord.lat,
            longitude: forecastData.city.coord.lon
          }
        ))
      ))
    ).subscribe(
      cycleWeatherData => this.weather.saveCycleWeatherData(cycleWeatherData),
      error => console.error(error.message)
    );
  }

  delete(name: string) {
    if (!name) return;
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