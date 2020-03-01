import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '@models/user';
import { environment } from '@env/environment';

@Injectable()
export class OauthUserService {

    constructor(
        private readonly http: HttpClient
    ) {
    }

    /**
     * Endpoint para registrar usuario
     * @param user
     */
    registerUser(user: UserModel): Promise<UserModel> {
        const url = `${ environment.api.baseUrlTmsWS }user/register`;
        return this.http
            .post<UserModel>(url, user)
            .toPromise();
    }

}
