import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLogsComponent } from './app-logs.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivateContentGuard } from '@guards/private-content.guard';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '@pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: AppLogsComponent,
        canActivate: [ PrivateContentGuard ]
    }
];

@NgModule({
    declarations: [ AppLogsComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatCardModule,
        FlexLayoutModule,
        MatListModule,
        MatIconModule,
        PipesModule
    ]
})
export class AppLogsModule {
}
