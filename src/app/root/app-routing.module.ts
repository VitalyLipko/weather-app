import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () => import('../feature/location-search/location-search.module').then(mod => mod.LocationSearchModule)
  },
  {
    path: 'locations',
    loadChildren: () => import('../feature/locations/locations.module').then(mod => mod.LocationsModule)
  },
  {
    path: ':currentLocation',
    loadChildren: () => import('../feature/location-details/location-details.module').then(mod => mod.LocationDetailsModule)
  },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () => import('../feature/page404/page404.module').then(mod => mod.Page404Module)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
