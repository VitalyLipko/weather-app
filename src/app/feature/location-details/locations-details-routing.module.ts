import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LocationDetailsComponent } from './location-details.component';

const routes: Routes = [
    {
        path: '',
        component: LocationDetailsComponent,
        children: [
            {
                path: ':currentLocation',
                component: LocationDetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LocationsDetailsRoutingModule { }
