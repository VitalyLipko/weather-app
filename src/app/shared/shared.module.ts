import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationCardComponent } from './location-card/location-card.component';
import { WeatherParamsPipe } from './pipes/weather-params.pipe';

@NgModule({
  declarations: [
    LocationCardComponent,
    WeatherParamsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WeatherParamsPipe,
    LocationCardComponent,
    CommonModule
  ]
})
export class SharedModule { }
