import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './create-location/location.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivateContentGuard } from '@guards/private-content.guard';
import { LocationListComponent } from './location-list/location-list.component';
import { PageLayoutsModule } from '@components/page-layouts/page-layouts.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
    {
        path: 'list',
        component: LocationListComponent,
        canActivate: [ PrivateContentGuard ]
    }
];

@NgModule({
    declarations: [ LocationComponent, LocationListComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PageLayoutsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class LocationModule {
}
