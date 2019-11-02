import { Coord } from './coord.model';

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  wind: Wind;
  clouds: Clouds;
  rain: Rain;
  snow: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
