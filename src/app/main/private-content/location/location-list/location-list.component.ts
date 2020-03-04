import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '@services/application/application.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationModel } from '@models/common/location';
import { LocationService } from '@services/common/location/location.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Router } from '@angular/router';
import { LocationComponent } from '../create-location/location.component';

@Component({
    selector: 'app-location-list',
    template: `
        <app-standard-page-layout
                pageTitle="Ubicaciones creadas"
                titleButton="Agregar ubicación"
                (floatActionButtonOutput)="openDialog()">

            <ng-template app-standard-page-list>
                <table>
                    <tr>
                        <th>País</th>
                        <th>Departamento</th>
                        <th>Zona</th>
                        <th>Avenida</th>
                        <th>Calle</th>
                    </tr>
                    <tr *ngFor="let location of locations">
                        <td>{{ location.country?.name }}</td>
                        <td>{{ location.department?.name }}</td>
                        <td>{{ location.zone }}</td>
                        <td>{{ location.avenue }}</td>
                        <td>{{ location.street }}</td>
                    </tr>
                </table>
            </ng-template>
        </app-standard-page-layout>
    `
})
export class LocationListComponent implements OnInit {

    locations: Array<LocationModel> = [];

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly locationService: LocationService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router,
        private readonly dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.loadLocations();
    }

    private loadLocations(): void {
        this.applicationService.showProgressBar();
        this.locationService
            .getAllLocations()
            .then(locations => this.locations = locations)
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
        this.dialog.open(LocationComponent, {
            width: '50%',
            height: '70%',
            panelClass: 'mat-dialog-without-padding',
            disableClose: true
        })
            .afterClosed()
            .subscribe(result => {
                if ( result ) {
                    this.applicationService.showSnackBar('Ubicación agregada exitosamente', false);
                    this.loadLocations();
                }
            });
    }

}
