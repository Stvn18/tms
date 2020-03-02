import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '@services/common/location/location.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        LocationService
    ]
})
export class CommonServicesModule {
}
