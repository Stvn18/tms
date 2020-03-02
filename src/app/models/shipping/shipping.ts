import { TrunkModel } from '@models/shipping/trunk';
import { LocationModel } from '@models/common/location';
import { PackageModel } from '@models/shipping/package';

export interface ShippingModel {
    _id?: string;
    trunk: TrunkModel;
    origin: LocationModel;
    destination: LocationModel;
    status: number;
    total: number;
    paymentType: number;
    phoneReference: string;
    quantityPackages: number;
    packages: Array<PackageModel>;
}
