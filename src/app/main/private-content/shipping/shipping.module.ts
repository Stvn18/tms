import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingListComponent } from './shipping-list/shipping-list.component';
import { CreateShippingComponent } from './create-shipping/create-shipping.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivateContentGuard } from '@guards/private-content.guard';
import { PageLayoutsModule } from '@components/page-layouts/page-layouts.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PackageDialogComponent } from './package-dialog/package-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
    {
        path: '',
        component: CreateShippingComponent,
        canActivate: [ PrivateContentGuard ]
    },
    {
        path: 'list',
        component: ShippingListComponent,
        canActivate: [ PrivateContentGuard ]
    }
];

@NgModule({
    declarations: [ ShippingListComponent, CreateShippingComponent, PackageDialogComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PageLayoutsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatSlideToggleModule
    ],
    providers: [
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'GTQ' }
    ]
})
export class ShippingModule {
}
