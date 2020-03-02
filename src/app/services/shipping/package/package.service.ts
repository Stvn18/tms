import { Injectable } from '@angular/core';
import { AbstractOidcAuthorization } from '@services/abstract-oidc-authorization';
import { HttpClient } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { PackageModel } from '@models/shipping/package';
import { environment } from '@env/environment';

@Injectable()
export class PackageService extends AbstractOidcAuthorization {

    constructor(http: HttpClient, oauthFacadeService: OauthFacadeService) {
        super(http, oauthFacadeService);
    }

    registerPackage(packageModel: PackageModel): Promise<PackageModel> {
        const url = `${ environment.api.baseUrlTmsWS }package/register`;
        return this.http
            .post<PackageModel>(url, packageModel, { headers: this.authorizationHeader })
            .toPromise();
    }

    getAllPackages(): Promise<Array<PackageModel>> {
        const url = `${ environment.api.baseUrlTmsWS }package/all`;
        return this.http
            .get<Array<PackageModel>>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

}
