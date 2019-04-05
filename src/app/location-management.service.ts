import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';

import { WeatherService, WeatherData, GroupWeatherData } from './weather.service';

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
  constructor(private weather: WeatherService, private router: Router, private lowerCasePipe: LowerCasePipe) { }

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
      this.locations.push(location);
      localStorage.setItem('locations', JSON.stringify(this.locations));
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

  show(name: string) {
    this.weather.getWeatherDataByName(name).subscribe(
      data => this.weather.saveWeatherData(data),
      error => {
        console.error('Error in retrieving weather data.');
        this.weather.errorStatus = error.status;
      }
    );
    this.weather.getForecastDataByName(name).subscribe(
      data => {
        this.weather.saveForecastData(data);
      },
      error => {
        console.error('Error in retrieving forecast data.');
        this.weather.errorStatus = error.status;
        this.router.navigate(['/search']);
      },
      () => this.router.navigate([`/locations/${this.lowerCasePipe.transform(name)}`])
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