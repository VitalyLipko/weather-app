import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationSearchComponent } from './location-search.component';
import { LocationsSearchRoutingModule } from './locations-search-routing.module';

@NgModule({
  declarations: [
    LocationSearchComponent
  ],
  imports: [
    CommonModule,
    LocationsSearchRoutingModule
  ]
})
export class LocationSearchModule { }
