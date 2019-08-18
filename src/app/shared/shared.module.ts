import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { LocationCardComponent } from './location-card/location-card.component';
import { WeatherParamsPipe } from './pipes/weather-params.pipe';
import { LocationsPaginatorDirective } from './directives/locations-paginator.directive';

@NgModule({
  declarations: [
    LocationCardComponent,
    WeatherParamsPipe,
    LocationsPaginatorDirective
  ],
  imports: [
    CommonModule,
    TooltipModule
  ],
  exports: [
    WeatherParamsPipe,
    LocationCardComponent,
    CommonModule,
    TooltipModule,
    LocationsPaginatorDirective
  ]
})
export class SharedModule { }
