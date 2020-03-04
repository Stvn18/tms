import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardPageLayoutComponent } from './standard-page-layout/standard-page-layout.component';
import { StandardDialogLayoutComponent } from './standard-dialog-layout/standard-dialog-layout.component';
import {
    StandardPageLayoutListDirective
} from '@components/page-layouts/standard-page-layout/standard-page-layout.directives';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { StandardDialogLayoutActionsDirective } from '@components/page-layouts/standard-dialog-layout/standard-dialog-layout-directives';

@NgModule({
    declarations: [
        StandardPageLayoutComponent,
        StandardDialogLayoutComponent,
        StandardPageLayoutListDirective,
        StandardDialogLayoutActionsDirective,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        PortalModule,
        MatButtonModule,
        MatProgressBarModule,
        MatDialogModule
    ],
    exports: [
        StandardPageLayoutComponent,
        StandardDialogLayoutComponent,
        StandardPageLayoutListDirective,
        StandardDialogLayoutActionsDirective,
    ]
})
export class PageLayoutsModule {
}
