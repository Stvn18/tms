import { Injectable } from '@angular/core';
import { AbstractOidcAuthorization } from '@services/abstract-oidc-authorization';
import { HttpClient } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { ShippingModel } from '@models/shipping/shipping';
import { environment } from '@env/environment';

@Injectable()
export class ShippingService extends AbstractOidcAuthorization {

    constructor(http: HttpClient, oauthFacadeService: OauthFacadeService) {
        super(http, oauthFacadeService);
    }

    createNewShipping(shipping: ShippingModel): Promise<ShippingModel> {
        const url = `${ environment.api.baseUrlTmsWS }shipping`;
        return this.http
            .post<ShippingModel>(url, shipping, { headers: this.authorizationHeader })
            .toPromise();
    }

    deletePackageFromShipping(shippingId: string, packageId: string): Promise<ShippingModel> {
        const url = `${ environment.api.baseUrlTmsWS }shipping/${ shippingId }/package/${ packageId }/remove`;
        return this.http
            .delete<ShippingModel>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

    getShippingByStatus(status: number): Promise<Array<ShippingModel>> {
        const url = `${ environment.api.baseUrlTmsWS }shipping/byStatus/${ status }`;
        return this.http
            .get<Array<ShippingModel>>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

    getShippingById(id: string): Promise<ShippingModel> {
        const url = `${ environment.api.baseUrlTmsWS }shipping/${ id }`;
        return this.http
            .get<ShippingModel>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

}
