import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { ApplicationService } from '@services/application/application.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TrunkModel } from '@models/shipping/trunk';
import { PilotModel } from '@models/shipping/pilot';

@Component({
    selector: 'app-trunk',
    templateUrl: './trunk.component.html'
})
export class TrunkComponent implements OnInit {

    trunkForm = new FormGroup({
        model: new FormControl('', Validators.required),
        brand: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        capacity: new FormControl(''),
        pilot: new FormControl('')
    });

    loading = false;
    pilots: Array<PilotModel> = [];

    constructor(
        private readonly dialogRef: MatDialogRef<TrunkComponent>,
        private readonly shippingFacadeService: ShippingFacadeService,
        private readonly applicationService: ApplicationService
    ) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.shippingFacadeService
            .getPilots()
            .then(pilots => this.pilots = pilots)
            .catch((exception: HttpErrorResponse) => this.applicationService.showSnackBar(exception.error, true))
            .finally(() => this.loading = false);
    }

    onSaveTrunk(): void {
        this.loading = true;
        const trunk: TrunkModel = {
            ...this.trunkForm.getRawValue()
        };
        this.shippingFacadeService
            .registerTrunk(trunk)
            .then(() => this.dialogRef.close(true))
            .catch((exception: HttpErrorResponse) => this.applicationService.showSnackBar(exception.error, true))
            .finally(() => this.loading = false);
    }

    onCancel(): void {
        this.dialogRef.close();
    }

}
