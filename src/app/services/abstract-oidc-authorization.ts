import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OauthFacadeService } from './oauth/oauth-facade.service';
import { takeUntil } from 'rxjs/operators';

export abstract class AbstractOidcAuthorization {

    protected unsubscribeAll = new Subject<boolean>();
    protected authorizationHeader: { Authorization: string; } = { Authorization: '' };

    protected constructor(protected http: HttpClient, protected oauth2FacadeService: OauthFacadeService) {
        this.oauth2FacadeService
            .tokenWithType
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(token => {
                if ( token ) {
                    this.authorizationHeader.Authorization = token;
                }
            });
    }
}
