import { Injectable } from '@angular/core';
import { AbstractOidcAuthorization } from '@services/abstract-oidc-authorization';
import { HttpClient } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { PilotModel } from '@models/shipping/pilot';
import { environment } from '@env/environment';

@Injectable()
export class PilotService extends AbstractOidcAuthorization {

    constructor(http: HttpClient, oauthFacadeService: OauthFacadeService) {
        super(http, oauthFacadeService);
    }

    registerPilot(pilot: PilotModel): Promise<PilotModel> {
        const url = `${ environment.api.baseUrlTmsWS }pilot/register`;
        return this.http
            .post<PilotModel>(url, pilot, { headers: this.authorizationHeader })
            .toPromise();
    }

    getPilots(): Promise<Array<PilotModel>> {
        const url = `${ environment.api.baseUrlTmsWS }pilot/all`;
        return this.http
            .get<Array<PilotModel>>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

    getPilotsUnassigned(): Promise<Array<PilotModel>> {
        const url = `${ environment.api.baseUrlTmsWS }pilot/all/unassigned`;
        return this.http
            .get<Array<PilotModel>>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

}
