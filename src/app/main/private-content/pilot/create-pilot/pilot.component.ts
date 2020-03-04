import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PilotModel } from '@models/shipping/pilot';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { ApplicationService } from '@services/application/application.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-pilot',
    templateUrl: './pilot.component.html'
})
export class PilotComponent {

    pilotForm = new FormGroup({
        name: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        identification: new FormControl('', Validators.required),
        licenceType: new FormControl('', Validators.required)
    });

    loading = false;

    constructor(
        private readonly dialogRef: MatDialogRef<PilotComponent>,
        private readonly shippingFacadeService: ShippingFacadeService,
        private readonly applicationService: ApplicationService
    ) {
    }

    onSavePilot(): void {
        this.loading = true;
        const pilot: PilotModel = {
            ...this.pilotForm.getRawValue(),
            assigned: false
        };
        this.shippingFacadeService
            .registerPilot(pilot)
            .then(() => this.dialogRef.close(true))
            .catch((exception: HttpErrorResponse) => this.applicationService.showSnackBar(exception.error, true))
            .finally(() => this.loading = false);
    }

    onCancel(): void {
        this.dialogRef.close();
    }

}
