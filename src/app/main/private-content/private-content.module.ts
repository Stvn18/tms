import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'logs',
        loadChildren: () => import('./app-logs/app-logs.module').then(m => m.AppLogsModule)
    },
    {
        path: 'pilot',
        loadChildren: () => import('./pilot/pilot.module').then(m => m.PilotModule)
    },
    {
        path: 'truck',
        loadChildren: () => import('./trunk/trunk.module').then(m => m.TrunkModule)
    },
    {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
    },
    {
        path: 'shp',
        loadChildren: () => import('./shipping/shipping.module').then(m => m.ShippingModule)
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class PrivateContentModule {
}
