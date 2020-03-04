import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotComponent } from './create-pilot/pilot.component';
import { PilotListComponent } from './pilot-list/pilot-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivateContentGuard } from '@guards/private-content.guard';
import { PageLayoutsModule } from '@components/page-layouts/page-layouts.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: 'list',
        component: PilotListComponent,
        canActivate: [ PrivateContentGuard ]
    }
];

@NgModule({
    declarations: [ PilotComponent, PilotListComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PageLayoutsModule,
        MatListModule,
        MatIconModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class PilotModule {
}
