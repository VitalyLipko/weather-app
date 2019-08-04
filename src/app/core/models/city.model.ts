import { Coord } from "./coord.model";

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
}