import { Component, OnInit } from '@angular/core';
import { TrunkModel } from '@models/shipping/trunk';
import { ApplicationService } from '@services/application/application.service';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TrunkComponent } from '../create-trunk/trunk.component';
import { PilotsDialogComponent } from '../pilots-dialog/pilots-dialog.component';

@Component({
    selector: 'app-trunk-list',
    template: `
        <app-standard-page-layout
                pageTitle="Camiones"
                titleButton="Agregar camión"
                (floatActionButtonOutput)="openDialog()">

            <ng-template app-standard-page-list>
                <table>
                    <tr>
                        <th>Año</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Código</th>
                        <th>Piloto asignado</th>
                        <th>Acción</th>
                    </tr>
                    <tr *ngFor="let trunk of trunks">
                        <td>{{ trunk.year }}</td>
                        <td>{{ trunk.model }}</td>
                        <td>{{ trunk.brand }}</td>
                        <td>{{ trunk.code }}</td>
                        <td>{{ trunk.pilot?.name }} {{ trunk.pilot?.lastName }}</td>
                        <td>
                            <button mat-icon-button (click)="showPilots(trunk._id)" title="Cambiar piloto">
                                <mat-icon>people</mat-icon>
                            </button>
                        </td>
                    </tr>
                </table>
            </ng-template>
        </app-standard-page-layout>
    `
})
export class TrunkListComponent implements OnInit {

    trunks: Array<TrunkModel> = [];

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly shippingService: ShippingFacadeService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router,
        private readonly dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.applicationService.showToolbar();
        this.loadTrunks();
    }

    private loadTrunks(): void {
        this.applicationService.showProgressBar();
        this.shippingService
            .getAllTrunks()
            .then(trunks => this.trunks = trunks)
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
        this.dialog.open(TrunkComponent, {
            width: '50%',
            height: '70%',
            panelClass: 'mat-dialog-without-padding',
            disableClose: true
        })
            .afterClosed()
            .subscribe(result => {
                if ( result ) {
                    this.applicationService.showSnackBar('Camión agregado exitosamente', false);
                    this.loadTrunks();
                }
            });
    }

    showPilots(id: string): void {
        this.dialog.open(PilotsDialogComponent, {
            width: '50%',
            height: '70%',
            data: id,
            panelClass: 'mat-dialog-without-padding',
            disableClose: true
        })
            .afterClosed()
            .subscribe(result => {
                if ( result ) {
                    this.applicationService.showSnackBar('Piloto asignado exitosamente', false);
                    this.loadTrunks();
                }
            });
    }

}
