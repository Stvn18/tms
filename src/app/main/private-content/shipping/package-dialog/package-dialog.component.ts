import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '@services/application/application.service';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PackageModel } from '@models/shipping/package';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-package-dialog',
    template: `
        <app-standard-dialog-layout
                dialogTitle="Registrar nuevo paquete"
                [loading]="loading"
                [cancelActionButtonDisabled]="false"
                [actionButtonDisabled]="packageForm.invalid"
                dialogActionButtonTranslateKey="Guardar"
                (dialogActionButtonOutput)="onSavePackage()"
                (dialogCancelButtonOutput)="onCancel()">

            <!--FORM-->
            <form name="notificationScheduleForm" [formGroup]="packageForm" fxLayout="column" fxFlex="1 0 auto">

                <div fxLayout="column" style="padding: 5px;">
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="15px">
                        <mat-form-field appearance="outline" fxFlex="50">
                            <mat-label>Código</mat-label>
                            <input matInput type="text" formControlName="code" required>
                            <mat-error>Campo requerido</mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="outline" fxFlex="50">
                            <mat-label>Peso (Kg)</mat-label>
                            <input matInput type="number" formControlName="weight" required>
                            <mat-error>Campo requerido</mat-error>
                        </mat-form-field>
                    </div>

                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="15px">
                        <mat-slide-toggle>¿Frágil</mat-slide-toggle>
                    </div>

                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="15px" style="margin-top: 15px">
                        <mat-form-field appearance="outline" fxFlex>
                            <mat-label>Descripción general</mat-label>
                            <input matInput type="text" formControlName="description">
                        </mat-form-field>
                    </div>
                </div>

            </form>
            <!--/FORM-->

        </app-standard-dialog-layout>
    `
})
export class PackageDialogComponent implements OnInit {

    packageForm = new FormGroup({
        weight: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        fragile: new FormControl(false, Validators.required),
        description: new FormControl('')
    });

    loading = false;

    constructor(
        private readonly dialogRef: MatDialogRef<PackageDialogComponent>,
        private readonly applicationService: ApplicationService,
        private readonly shippingFacadeService: ShippingFacadeService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
    }

    onSavePackage(): void {
        this.loading = true;
        const packageModel: PackageModel = {
            ...this.packageForm.getRawValue()
        };
        this.shippingFacadeService
            .registerPackage(packageModel)
            .then(packageCreated => this.dialogRef.close(packageCreated))
            .catch(async (exception: HttpErrorResponse) => {
                if ( exception.status === 401 ) {
                    this.applicationService.showSnackBar('Se ha finalizado la sesión', false);
                    await this.oauthFacadeService.logout();
                    await this.router.navigateByUrl('/auth/login');
                } else {
                    this.applicationService.showSnackBar(exception.error, true);
                }
            })
            .finally(() => this.loading = false);
    }

    onCancel(): void {
        this.dialogRef.close();
    }

}
