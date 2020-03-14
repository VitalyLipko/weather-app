import { Coord } from './coord.model';
import { MainParameters } from './main-parameters.model';
import { Wind } from './wind.model';
import { Clouds } from './clouds.model';
import { Rain } from './rain.model';
import { Snow } from './snow.model';
import { Weather } from './weather.model';
import { Sys } from './sys.model';

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: MainParameters;
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
