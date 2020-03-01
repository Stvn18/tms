import { Component, OnInit } from '@angular/core';
import { APPLICATION_NAME } from '@constants/application';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApplicationService } from '@services/application/application.service';

@Component({
    selector: 'app-toolbar-layout',
    templateUrl: './toolbar.component.html',
    styleUrls: [ './toolbar.component.scss' ]
})
export class ToolbarComponent implements OnInit {

    title = APPLICATION_NAME;
    showToolbar = true;

    constructor(
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly applicationService: ApplicationService,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.applicationService
            .getStatusToolbar()
            .subscribe(value => this.showToolbar = value);
    }

    doLogout(): void {
        this.applicationService.showProgressBar();
        this.oauthFacadeService
            .logout()
            .then(async () => {
                this.snackBar.open('Sesión finalizada', 'OK', {
                    duration: 2000,
                    verticalPosition: 'top',
                    panelClass: 'snackbar-success'
                });
                await this.router.navigateByUrl('/auth/login');
            })
            .catch((exception: HttpErrorResponse) => {
                this.snackBar.open(exception.message, 'OK', {
                    duration: 2000,
                    verticalPosition: 'top',
                    panelClass: 'snackbar-error'
                });
            })
            .finally(() => this.applicationService.hideProgressBar());
    }
}
