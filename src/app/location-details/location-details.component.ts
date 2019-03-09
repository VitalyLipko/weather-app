import { Component, OnInit } from '@angular/core';
import { WeatherService, CurrentWeatherData } from '../weather.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  currentWeatherData: CurrentWeatherData;
  isCollapsed: boolean = true;
  constructor(public weather: WeatherService) { }

  ngOnInit() {
    //сомнительное решение обхода ошибки "undefined type"
    setTimeout(() => {
      this.weather.getCurrentWeatherDataStorage().subscribe((data) => { this.currentWeatherData = data });
    }, 500);
  }

}
