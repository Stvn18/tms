import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '@services/application/application.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit, OnDestroy {

    showProgressBar = false;
    registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8}$')
        ])
    });

    private readonly destroy = new Subject<boolean>();

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.applicationService.hideToolbar();
        this.applicationService
            .getStatusProgressBar()
            .pipe(takeUntil(this.destroy))
            .subscribe(value => {
                this.showProgressBar = value;
                if ( value ) {
                    this.registerForm.disable();
                } else {
                    this.registerForm.enable();
                }
            });
    }

    doRegister(): void {
        this.applicationService.showProgressBar();
        this.oauthFacadeService
            .registerUser({
                ...this.registerForm.getRawValue()
            })
            .then(async () => {
                this.applicationService.showSnackBar('Se ha registrado exitosamente', false);
                this.cleanForm();
                await this.router.navigateByUrl('auth/login');
            })
            .catch((exception: HttpErrorResponse) => this.applicationService.showSnackBar(exception.error, true))
            .finally(() => this.applicationService.hideProgressBar());
    }

    private cleanForm(): void {
        this.registerForm.controls.name.clearValidators();
        this.registerForm.controls.name.setValue('');
        this.registerForm.controls.email.clearValidators();
        this.registerForm.controls.email.setValue('');
        this.registerForm.controls.password.clearValidators();
        this.registerForm.controls.password.setValue('');
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.complete();
    }

}
