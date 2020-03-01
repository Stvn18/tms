import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';

@Injectable()
export class PrivateContentGuard implements CanActivate {
    constructor(public router: Router, private oauth2FacadeService: OauthFacadeService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        // Para que el guardia de ruta no permita el redirect al contenido privado
        return new Promise<boolean>(async (resolve) => {
            const isAuthenticated = await this.oauth2FacadeService.isAuthenticated();

            // 1. valida si esta autenticado
            if ( !isAuthenticated ) {
                await this.router.navigate([ '/login' ]);
                resolve(false);
            }

            resolve(true);
        });
    }
}
