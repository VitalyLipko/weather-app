import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';

import { WeatherService } from './weather.service';
import { GroupWeatherData, WeatherData } from '../models';

interface Location {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  isBookmark: boolean;
  favorites: Location[];
  groupWeatherData: GroupWeatherData;

  constructor(
    private weather: WeatherService,
    private router: Router,
    private lowerCasePipe: LowerCasePipe,
  ) {
    const storageItems = localStorage.getItem('favorites');

    if (storageItems) {
      this.favorites = JSON.parse(storageItems);
    } else {
      this.favorites = [];
    }
  }

  isLocationExist(name: string): boolean {
    return !!this.favorites.find(location => location.name === name);
  }

  enablePagination(): boolean {
    return this.favorites.length > 1 && this.router.url.includes('favorites/');
  }

  manage(weatherData: WeatherData) {
    const location: Location = {
      id: 0,
      name: '',
    };
    location.id = weatherData.id;
    location.name = weatherData.name;
    this.isBookmark = !this.isBookmark;
    if (this.isBookmark) {
      if (this.favorites.length < 15) {
        this.favorites.push(location);
        this.favorites = this.favorites.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      } else {
        this.isBookmark = false;
      }
    } else {
      if (this.favorites.length === 1) {
        this.favorites = [];
        localStorage.removeItem('favorites');
      } else {
        this.favorites.splice(
          this.favorites.findIndex(x => x.id === location.id),
          1,
        );
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    }
  }

  getData(id: number) {
    if (!id) {
      return;
    }
    this.weather.isDataLoaded = false;
    this.weather
      .getWeatherDataById(id)
      .pipe(
        tap(
          weatherData => this.weather.saveWeatherData(weatherData),
          error => {
            console.error(error.message);
            this.weather.errorStatus = error.error.status;
            this.weather.isDataLoaded = true;
            this.router.navigate(['/search']);
          },
        ),
        switchMap(() =>
          this.weather.getForecastDataById(id).pipe(
            tap(
              forecastData => {
                this.weather.saveForecastData(forecastData);
                this.weather.isDataLoaded = true;
                if (
                  this.router.url.substr(1, 9) === 'favorites' &&
                  this.isLocationExist(forecastData.city.name)
                ) {
                  this.router.navigate([
                    `/favorites/${this.lowerCasePipe.transform(
                      forecastData.city.name,
                    )}`,
                  ]);
                } else {
                  this.router.navigate([
                    `${this.lowerCasePipe.transform(forecastData.city.name)}`,
                  ]);
                }
              },
              error => {
                console.error(error.message);
                this.weather.errorStatus = error.error.status;
                this.weather.isDataLoaded = true;
                this.router.navigate(['/search']);
              },
            ),
            switchMap(forecastData =>
              this.weather.getCycleWeatherData({
                latitude: forecastData.city.coord.lat,
                longitude: forecastData.city.coord.lon,
              }),
            ),
          ),
        ),
      )
      .subscribe(
        cycleWeatherData => this.weather.saveCycleWeatherData(cycleWeatherData),
        error => console.error(error.message),
      );
  }

  delete(name: string) {
    if (!name) {
      return;
    }
    if (this.favorites.length === 1) {
      this.favorites = [];
      localStorage.removeItem('favorites');
    } else {
      this.favorites.splice(
        this.favorites.findIndex(x => x.name === name),
        1,
      );
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.groupWeatherData.list.splice(
        this.groupWeatherData.list.findIndex(list => list.name === name),
        1,
      );
      --this.groupWeatherData.cnt;
    }
  }
}
