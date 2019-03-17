import { Component, OnInit } from '@angular/core';
import { WeatherService, WeatherData, ForecastData, List } from '../weather.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  weatherData: WeatherData;
  forecastData: ForecastData;
  forecastDays: List[];
  forecastNights: List[];
  forecastDay: List[];

  constructor(public weather: WeatherService) { }

  ngOnInit() {
    //сомнительное решение обхода ошибки "undefined type"
    setTimeout(() => {
      this.weather.getWeatherDataStorage().subscribe((data) => { this.weatherData = data });
      //Прогноз на 5 дней охватывает сегодняшний день, если запрос произошел до полудня
      this.weather.getForecastDataStorage().subscribe(
        (data) => { this.forecastData = data },
        () => { },
        () => {
          this.forecastDays = this.weather.getForecastDays(this.forecastData.list);
          this.forecastNights = this.weather.getForecastNight(this.forecastData.list);
          this.forecastDay = this.weather.getForecastDay(this.forecastData.list);
        }
      );
    }, 500);
  }
}
