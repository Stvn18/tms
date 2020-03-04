import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '@services/application/application.service';
import { Router } from '@angular/router';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { ShippingModel } from '@models/shipping/shipping';
import { HttpErrorResponse } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';

@Component({
    selector: 'app-shipping-list',
    template: `
        <app-standard-page-layout
                pageTitle="Envíos registrados"
                titleButton="Agregar nuevo envío"
                (floatActionButtonOutput)="goToCreate()">

            <ng-template app-standard-page-list>
                <table>
                    <tr>
                        <th>Camión</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Paquetes</th>
                        <th>Total</th>
                    </tr>
                    <tr *ngFor="let shipping of shippingList">
                        <td>{{ shipping.trunk?.brand }}-{{ shipping.trunk?.code }}</td>
                        <td>{{ shipping.origin?.comments }}</td>
                        <td>{{ shipping.destination?.comments }}</td>
                        <td>{{ shipping.quantityPackages }}</td>
                        <td>{{ shipping.total | currency }}</td>
                    </tr>
                </table>
            </ng-template>
        </app-standard-page-layout>
    `
})
export class ShippingListComponent implements OnInit {

    shippingList: Array<ShippingModel> = [];

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly shippingFacadeService: ShippingFacadeService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.applicationService.showProgressBar();
        this.shippingFacadeService
            .getShippingByStatus(0)
            .then(data => this.shippingList = data)
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

    async goToCreate() {
        await this.router.navigateByUrl('/shp');
    }

}
