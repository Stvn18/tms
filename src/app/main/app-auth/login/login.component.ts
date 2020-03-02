import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { UserModel } from '@models/auth/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApplicationService } from '@services/application/application.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

    showProgressBar = false;
    loginForm: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly oAuthFacadeService: OauthFacadeService,
        private readonly applicationService: ApplicationService,
        private readonly router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [ Validators.required, Validators.email ]),
            password: new FormControl('', [ Validators.required ])
        });
    }

    ngOnInit(): void {
        this.applicationService.hideToolbar();
    }

    doLogin(): void {
        this.showLoading();
        const user: UserModel = {
            ...this.loginForm.getRawValue()
        };
        this.oAuthFacadeService
            .login(user)
            .then(async () => {
                this.applicationService.showSnackBar('Sesión iniciada correctamente', false);
                await this.router.navigateByUrl('/dashboard');
            })
            .catch((exception: HttpErrorResponse) => this.applicationService.showSnackBar(exception.error, true))
            .finally(() => this.hideLoading());
    }

    private showLoading(): void {
        this.loginForm.disable();
        this.showProgressBar = true;
        this.applicationService.showProgressBar();
    }

    private hideLoading(): void {
        this.loginForm.enable();
        this.showProgressBar = false;
        this.applicationService.hideProgressBar();
    }

}
