import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationService } from '@services/application/application.service';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    template: `
        <h2>Bienvenid@ <strong>{{userName}}</strong></h2>
        <div fxLayout="row" fxLayoutAlign="center center">
            <mat-card (click)="goShippingList()">
                <mat-card-title>Envíos realizados</mat-card-title>
                <mat-card-content class="content-value">
                    <br><br><br>
                    <span>{{quantity}}</span>
                    <br><br><br>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [
            `
            .content-value {
                text-align: center;
                font-weight: bold;
                font-size: 70px;
                color: blue;
            }
        `
    ]
})
export class DashboardComponent implements OnInit, OnDestroy {

    userName = '';
    quantity = 0;

    private readonly destroy$ = new Subject<boolean>();

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly shippingFacadeService: ShippingFacadeService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.applicationService.showToolbar();
        this.oauthFacadeService
            .currentUserAuthenticated
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => this.userName = user.name);

        this.applicationService.showProgressBar();
        this.shippingFacadeService
            .getShippingByStatus(0)
            .then(shippingList => this.quantity = shippingList.length)
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

    async goShippingList() {
        if ( this.quantity > 0 ) {
            await this.router.navigateByUrl('/shp/list');
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

}
