import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatSnackBarModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
    exports: [
        ToolbarComponent
    ]
})
export class ToolbarModule {
}
