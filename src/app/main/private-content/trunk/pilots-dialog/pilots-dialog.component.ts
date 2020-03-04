import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { PilotModel } from '@models/shipping/pilot';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from '@services/application/application.service';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pilots-dialog',
    template: `
        <app-standard-dialog-layout
                dialogTitle="Asignar piloto"
                [loading]="loading"
                [showDialogActions]="false"
                (dialogCancelButtonOutput)="onCancel()">

            <div fxLayout="column" style="padding: 5px;">
                <mat-card>
                    <mat-card-content>
                        <h2 *ngIf="pilots.length === 0">No hay pilotos sin asignar</h2>
                        <mat-nav-list>
                            <mat-list-item *ngFor="let pilot of pilots" (click)="assign(pilot)">
                                <mat-icon matListIcon>person</mat-icon>
                                <h4 matLine><strong>Identificación:</strong> {{ pilot.identification }} </h4>
                                <h4 matLine><strong>Nombre:</strong> {{ pilot.name }} {{pilot.lastName}} </h4>
                                <p matLine><strong>Tipo licencia:</strong>  {{ pilot.licenceType }} </p>
                            </mat-list-item>
                        </mat-nav-list>
                    </mat-card-content>
                </mat-card>
            </div>
        </app-standard-dialog-layout>
    `,
})
export class PilotsDialogComponent implements OnInit {

    loading = false;
    pilots: Array<PilotModel> = [];

    constructor(
        private readonly dialogRef: MatDialogRef<PilotsDialogComponent>,
        private readonly shippingFacadeService: ShippingFacadeService,
        private readonly applicationService: ApplicationService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router,
        @Inject(MAT_DIALOG_DATA) public data: string,
    ) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.shippingFacadeService
            .getPilotsUnassigned()
            .then(pilots => this.pilots = pilots)
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

    assign(pilot: PilotModel): void {
        this.loading = true;
        this.shippingFacadeService
            .assignPilot(this.data, pilot)
            .then(() => this.dialogRef.close(true))
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
