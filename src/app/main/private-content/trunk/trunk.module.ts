import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrunkComponent } from './create-trunk/trunk.component';
import { RouterModule, Routes } from '@angular/router';
import { TrunkListComponent } from './trunk-list/trunk-list.component';
import { PrivateContentGuard } from '@guards/private-content.guard';
import { PageLayoutsModule } from '@components/page-layouts/page-layouts.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { PilotsDialogComponent } from './pilots-dialog/pilots-dialog.component';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
    {
        path: 'list',
        component: TrunkListComponent,
        canActivate: [ PrivateContentGuard ]
    }
];

@NgModule({
    declarations: [ TrunkComponent, TrunkListComponent, PilotsDialogComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PageLayoutsModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule
    ]
})
export class TrunkModule {
}
