import { Injectable } from '@angular/core';
import { AbstractOidcAuthorization } from '@services/abstract-oidc-authorization';
import { HttpClient } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { TrunkModel } from '@models/shipping/trunk';
import { environment } from '@env/environment';

@Injectable()
export class TrunkService extends AbstractOidcAuthorization {

    constructor(http: HttpClient, oauthFacadeService: OauthFacadeService) {
        super(http, oauthFacadeService);
    }

    registerTrunk(trunkModel: TrunkModel): Promise<TrunkModel> {
        const url = `${ environment.api.baseUrlTmsWS }trunk/register`;
        return this.http
            .post<TrunkModel>(url, trunkModel, { headers: this.authorizationHeader })
            .toPromise();
    }

    getAllTrunks(): Promise<Array<TrunkModel>> {
        const url = `${ environment.api.baseUrlTmsWS }trunk/all`;
        return this.http
            .get<Array<TrunkModel>>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

}
