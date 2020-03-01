import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationService } from '@services/application/application.service';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    template: `
        <h2>Bienvenid@ <strong>{{userName}}</strong></h2>
    `
})
export class DashboardComponent implements OnInit, OnDestroy {

    userName = '';

    private readonly destroy$ = new Subject<boolean>();

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly oauthFacadeService: OauthFacadeService
    ) {
    }

    ngOnInit(): void {
        this.applicationService.showToolbar();
        this.oauthFacadeService
            .currentUserAuthenticated
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => this.userName = user.name);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

}
