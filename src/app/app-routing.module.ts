import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsComponent } from './locations/locations.component';
import { LocationDetailsComponent } from './location-details-components/location-details/location-details.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: 'search', component: LocationSearchComponent },
  { path: 'locations', component: LocationsComponent },
  { path: ':currentLocation', component: LocationDetailsComponent },
  { path: 'locations/:currentLocation', component: LocationDetailsComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
