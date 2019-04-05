import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsComponent } from './locations/locations.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationSearchComponent } from './location-search/location-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: LocationSearchComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/:currentLocation', component: LocationDetailsComponent },
  { path: ':currentLocation', component: LocationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
