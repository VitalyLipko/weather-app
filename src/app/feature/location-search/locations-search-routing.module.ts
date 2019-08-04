import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LocationSearchComponent } from './location-search.component';

const routes: Routes = [
    {
        path: '',
        component: LocationSearchComponent
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
export class LocationsSearchRoutingModule { }
