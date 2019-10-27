import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationSearchComponent } from './location-search.component';
import { LocationsSearchRoutingModule } from './locations-search-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LocationSearchComponent
  ],
  imports: [
    CommonModule,
    LocationsSearchRoutingModule,
    SharedModule
  ]
})
export class LocationSearchModule { }
