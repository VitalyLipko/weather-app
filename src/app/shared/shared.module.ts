import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LocationCardComponent } from './components/location-card/location-card.component';
import { WeatherParamsPipe } from './pipes/weather-params.pipe';
import { LocationsPaginatorDirective } from './directives/locations-paginator.directive';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    LocationCardComponent,
    WeatherParamsPipe,
    LocationsPaginatorDirective,
    ToolbarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    WeatherParamsPipe,
    LocationCardComponent,
    CommonModule,
    TooltipModule,
    LocationsPaginatorDirective,
    LayoutComponent
  ]
})
export class SharedModule { }
