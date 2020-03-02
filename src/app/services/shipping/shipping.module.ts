import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageService } from '@services/shipping/package/package.service';
import { PilotService } from '@services/shipping/pilot/pilot.service';
import { ShippingService } from '@services/shipping/shipping/shipping.service';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { TrunkService } from '@services/shipping/trunk/trunk.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        PackageService,
        PilotService,
        TrunkService,
        ShippingService,
        ShippingFacadeService
    ]
})
export class ShippingModule {
}
