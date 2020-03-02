import { Injectable, Injector } from '@angular/core';
import { PackageService } from '@services/shipping/package/package.service';
import { PilotService } from '@services/shipping/pilot/pilot.service';
import { ShippingService } from '@services/shipping/shipping/shipping.service';
import { TrunkService } from '@services/shipping/trunk/trunk.service';

@Injectable()
export class ShippingFacadeService {

    private lazyPackageService: PackageService;
    private lazyPilotService: PilotService;
    private lazyShippingService: ShippingService;
    private lazyTrunkService: TrunkService;

    constructor(
        private readonly injector: Injector
    ) {
    }

    private get packageService(): PackageService {
        if ( !this.lazyPackageService ) {
            this.lazyPackageService = this.injector.get(PackageService);
        }
        return this.lazyPackageService;
    }

    private get pilotService(): PilotService {
        if ( !this.lazyPilotService ) {
            this.lazyPilotService = this.injector.get(PilotService);
        }
        return this.lazyPilotService;
    }

    private get shippingService(): ShippingService {
        if ( !this.lazyShippingService ) {
            this.lazyShippingService = this.injector.get(ShippingService);
        }
        return this.lazyShippingService;
    }

    private get trunkService(): TrunkService {
        if ( !this.lazyTrunkService ) {
            this.lazyTrunkService = this.injector.get(TrunkService);
        }
        return this.lazyTrunkService;
    }

}
