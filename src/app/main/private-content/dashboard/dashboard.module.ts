import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivateContentGuard } from '@guards/private-content.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [ PrivateContentGuard ],
    }
];

@NgModule({
    declarations: [ DashboardComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class DashboardModule {
}
