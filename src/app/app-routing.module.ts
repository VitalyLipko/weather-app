import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsComponent } from './locations/locations.component';
import { LocationDetailsComponent } from './location-details/location-details.component';

const routes: Routes = [
  { path: 'locations', component: LocationsComponent },
  { path: ':currentLocation', component: LocationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
