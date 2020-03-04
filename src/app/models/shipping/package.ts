import { ShippingModel } from '@models/shipping/shipping';

export interface PackageModel {
    _id?: string;
    weight: number;
    code: string;
    fragile?: boolean;
    description?: string;
    shipping?: ShippingModel;
}
