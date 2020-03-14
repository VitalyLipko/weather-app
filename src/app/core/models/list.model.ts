import { MainParameters } from './main-parameters.model';
import { Wind } from './wind.model';
import { Clouds } from './clouds.model';
import { Weather } from './weather.model';

export interface List {
  dt: number;
  main: MainParameters;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  rain: number;
  snow: number;
  dt_txt: string;
}
