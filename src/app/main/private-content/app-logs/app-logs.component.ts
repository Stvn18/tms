import { Component, OnInit } from '@angular/core';
import { LogService } from '@services/oauth/log.service';
import { LogModel } from '@models/auth/log';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from '@services/application/application.service';
import { Router } from '@angular/router';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { orderArrayDesc } from '@utils/order-arrays-utils';

@Component({
    selector: 'app-app-logs',
    template: `
        <div class="log-container">
            <mat-card [style.overflow]="'auto'" [style.height.px]="'400'">
                <mat-card-title>Bitácora</mat-card-title>
                <mat-card-content>
                    <mat-nav-list>
                        <mat-list-item *ngFor="let log of logs">
                            <mat-icon matListIcon>person</mat-icon>
                            <h4 matLine> {{ log.updatedAt | apiDate:'dd-MM-yyyy HH:mm' }} </h4>
                            <h4 matLine> {{ log.createdBy }} </h4>
                            <p matLine>  {{ log.description }} </p>
                        </mat-list-item>
                    </mat-nav-list>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [
            `
            .log-container {
                padding: 1% 20% 3% 20%;
                align-items: center;
            }
        `
    ]
})
export class AppLogsComponent implements OnInit {

    logs: Array<LogModel> = [];

    constructor(
        private readonly logService: LogService,
        private readonly applicationService: ApplicationService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.applicationService.showProgressBar();
        this.logService
            .getLogs()
            .then(logs => {
                this.logs = logs;
                orderArrayDesc(this.logs, 'updatedAt');
            })
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

}
