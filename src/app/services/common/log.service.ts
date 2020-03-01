import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractOidcAuthorization } from '@services/abstract-oidc-authorization';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { LogModel } from '@models/log';
import { environment } from '@env/environment';

@Injectable()
export class LogService extends AbstractOidcAuthorization {

    constructor(http: HttpClient, oauthFacadeService: OauthFacadeService) {
        super(http, oauthFacadeService);
    }

    getLogs(): Promise<Array<LogModel>> {
        const url = `${ environment.api.baseUrlTmsWS }auth/logs`;
        return this.http
            .get<Array<LogModel>>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

}
