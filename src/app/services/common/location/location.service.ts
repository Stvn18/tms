import { Injectable } from '@angular/core';
import { AbstractOidcAuthorization } from '@services/abstract-oidc-authorization';
import { HttpClient } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { LocationModel } from '@models/common/location';
import { environment } from '@env/environment';

@Injectable()
export class LocationService extends AbstractOidcAuthorization {

    constructor(http: HttpClient, oauthFacadeService: OauthFacadeService) {
        super(http, oauthFacadeService);
    }

    registerLocation(location: LocationModel): Promise<LocationModel> {
        const url = `${ environment.api.baseUrlTmsWS }location/register`;
        return this.http
            .post<LocationModel>(url, location, { headers: this.authorizationHeader })
            .toPromise();
    }

    getAllLocations(): Promise<Array<LocationModel>> {
        const url = `${ environment.api.baseUrlTmsWS }location/all`;
        return this.http
            .get<Array<LocationModel>>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

}
