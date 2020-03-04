import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '@services/application/application.service';
import { PilotModel } from '@models/shipping/pilot';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PilotComponent } from '../create-pilot/pilot.component';

@Component({
    selector: 'app-pilot-list',
    template: `
        <app-standard-page-layout
                pageTitle="Pilotos"
                titleButton="Agregar piloto"
                (floatActionButtonOutput)="openDialog()">

            <ng-template app-standard-page-list>
                <mat-list-item *ngFor="let pilot of pilots">
                    <mat-icon matListIcon>person</mat-icon>
                    <h4 matLine><strong>Identificación:</strong> {{ pilot.identification }} </h4>
                    <h4 matLine><strong>Nombre:</strong> {{ pilot.name }} {{pilot.lastName}} </h4>
                    <p matLine><strong>Tipo licencia:</strong>  {{ pilot.licenceType }} </p>
                </mat-list-item>
            </ng-template>
        </app-standard-page-layout>
    `
})
export class PilotListComponent implements OnInit {

    pilots: Array<PilotModel> = [];

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly shippingFacadeService: ShippingFacadeService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router,
        private readonly dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.applicationService.showToolbar();
        this.loadPilots();
    }

    private loadPilots(): void {
        this.applicationService.showProgressBar();
        this.shippingFacadeService
            .getPilots()
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
            .finally(() => this.applicationService.hideProgressBar());
    }

    openDialog(): void {
        this.dialog.open(PilotComponent, {
            width: '50%',
            height: '70%',
            panelClass: 'mat-dialog-without-padding',
            disableClose: true
        })
            .afterClosed()
            .subscribe(result => {
                if ( result ) {
                    this.applicationService.showSnackBar('Piloto agregado exitosamente', false);
                    this.loadPilots();
                }
            });
    }

}
