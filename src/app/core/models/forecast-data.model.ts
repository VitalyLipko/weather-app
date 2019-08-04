import { City } from './city.model';
import { List } from './list.model';

export interface ForecastData {
  cod: number;
  message: number;
  city: City;
  cnt: number;
  list: List[];
}