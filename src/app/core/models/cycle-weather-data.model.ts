import { WeatherData } from './weather-data.model';

export interface CycleWeatherData {
  message: string;
  cod: number;
  count: number;
  list: WeatherData[];
}