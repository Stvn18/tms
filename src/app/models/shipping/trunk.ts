import { PilotModel } from '@models/shipping/pilot';

export interface TrunkModel {
    _id?: string;
    model: string;
    brand: string;
    code: string;
    year: number;
    capacity?: number;
    pilot: PilotModel;
}
