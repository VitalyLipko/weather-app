import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';

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
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    AlertModule.forRoot(),
  ],
  exports: [
    WeatherParamsPipe,
    LocationCardComponent,
    CommonModule,
    TooltipModule,
    LocationsPaginatorDirective,
    LayoutComponent,
    AlertModule,
  ],
})
export class SharedModule {}
