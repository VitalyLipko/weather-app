import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LocationsComponent } from './locations.component';

const routes: Routes = [
    {
        path: '',
        component: LocationsComponent,
        children: [
            {
                path: 'locations/:currentLocation',
                loadChildren: () => import('../location-details/location-details.module').then(mod => mod.LocationDetailsModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocationsRoutingModule { }
