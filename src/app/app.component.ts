import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';

import { WeatherService } from './weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nameLocation = new FormControl("");
  private locationName:string;

  constructor(public weather: WeatherService, private router: Router, private lowerCasePipe: LowerCasePipe) { }

  search(name: string) {
    this.nameLocation.setValue("");
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
        this.locationName = data.city.name;
      },
      error => {
        console.error('Error in retrieving forecast data.');
        this.weather.errorStatus = error.status;
        this.router.navigate(['/search']);
      },
      () => this.router.navigate([`${this.lowerCasePipe.transform(this.locationName)}`])
    );
  }
}
