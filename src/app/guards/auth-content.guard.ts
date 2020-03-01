import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';

@Injectable()
export class AuthContentGuard implements CanActivate {

    constructor(private router: Router, private oauth2FacadeService: OauthFacadeService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const isAuthenticated = await this.oauth2FacadeService.isAuthenticated();

            if ( isAuthenticated ) {
                await this.router.navigate([ '/dashboard' ]);
                resolve(false);
            }

            // Si esta autenticado no puede ir al login, se envia false
            resolve(true);
        });
    }

}
