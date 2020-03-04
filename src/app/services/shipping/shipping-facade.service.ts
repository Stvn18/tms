import { Injectable, Injector } from '@angular/core';
import { PackageService } from '@services/shipping/package/package.service';
import { PilotService } from '@services/shipping/pilot/pilot.service';
import { ShippingService } from '@services/shipping/shipping/shipping.service';
import { TrunkService } from '@services/shipping/trunk/trunk.service';
import { PackageModel } from '@models/shipping/package';
import { PilotModel } from '@models/shipping/pilot';
import { TrunkModel } from '@models/shipping/trunk';
import { ShippingModel } from '@models/shipping/shipping';

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

    registerPackage(packageModel: PackageModel): Promise<PackageModel> {
        return this.packageService.registerPackage(packageModel);
    }

    getAllPackages(): Promise<Array<PackageModel>> {
        return this.packageService.getAllPackages();
    }

    registerPilot(pilot: PilotModel): Promise<PilotModel> {
        return this.pilotService.registerPilot(pilot);
    }

    getPilots(): Promise<Array<PilotModel>> {
        return this.pilotService.getPilots();
    }

    getPilotsUnassigned(): Promise<Array<PilotModel>> {
        return this.pilotService.getPilotsUnassigned();
    }

    registerTrunk(trunkModel: TrunkModel): Promise<TrunkModel> {
        return this.trunkService.registerTrunk(trunkModel);
    }

    assignPilot(idTrunk: string, pilot: PilotModel): Promise<TrunkModel> {
        return this.trunkService.assignPilot(idTrunk, pilot);
    }

    getAllTrunks(): Promise<Array<TrunkModel>> {
        return this.trunkService.getAllTrunks();
    }

    createNewShipping(shipping: ShippingModel): Promise<ShippingModel> {
        return this.shippingService.createNewShipping(shipping);
    }

    deletePackageFromShipping(shippingId: string, packageId: string): Promise<ShippingModel> {
        return this.shippingService.deletePackageFromShipping(shippingId, packageId);
    }

    getShippingByStatus(status: number): Promise<Array<ShippingModel>> {
        return this.shippingService.getShippingByStatus(status);
    }

    getShippingById(id: string): Promise<ShippingModel> {
        return this.shippingService.getShippingById(id);
    }

}
