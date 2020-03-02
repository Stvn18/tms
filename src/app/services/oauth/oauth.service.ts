import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TOKEN_KEY } from '@constants/application';
import { UserModel, OAuthUserInfoModel } from '@models/auth/user';
import { environment } from '@env/environment';

@Injectable()
export class OauthService {

    private readonly tokenWithTypeSubject = new BehaviorSubject<string>(null);
    private readonly currentUserAuthenticatedSubject = new BehaviorSubject<OAuthUserInfoModel>(null);

    constructor(
        private readonly http: HttpClient
    ) {
    }

    token(): Observable<string> {
        return this.tokenWithTypeSubject.asObservable();
    }

    /**
     * Observable para los datos del usuario autenticado
     */
    currentUserAuthenticated(): Observable<OAuthUserInfoModel> {
        return this.currentUserAuthenticatedSubject.asObservable();
    }

    /**
     * Indica si el usuario está autenticado
     */
    isAuthenticated(): boolean {
        const sessionData = JSON.parse(localStorage.getItem(TOKEN_KEY)) as OAuthUserInfoModel;
        if ( sessionData ) {
            this.currentUserAuthenticatedSubject.next(sessionData);
            this.tokenWithTypeSubject.next(sessionData.accessToken);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Endpoint para autenticarse en el sistema
     * @param user
     */
    authenticate(user: UserModel): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const url = `${ environment.api.baseUrlTmsWS }auth/login`;
                const sessionData = await this.http
                    .post<OAuthUserInfoModel>(url, user)
                    .toPromise();

                localStorage.setItem(TOKEN_KEY, JSON.stringify(sessionData));

                this.tokenWithTypeSubject.next(sessionData.accessToken);
                this.currentUserAuthenticatedSubject.next(sessionData);

                resolve();
            } catch ( e ) {
                console.error(e);
                reject(e);
            }
        });
    }

    /**
     * Endpoint para desloguearse del sistema
     */
    logout(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const url = `${ environment.api.baseUrlTmsWS }auth/logout`;

                const sessionData = JSON.parse(localStorage.getItem(TOKEN_KEY)) as OAuthUserInfoModel;

                if ( sessionData ) {
                    await this.http.post<void>(url, null, {
                        headers: {
                            Authorization: sessionData.accessToken
                        }
                    }).toPromise();

                    localStorage.removeItem(TOKEN_KEY);
                    this.tokenWithTypeSubject.next(null);
                    this.currentUserAuthenticatedSubject.next(null);

                    resolve();
                } else {
                    resolve();
                }
            } catch ( e ) {
                console.error(e);
                reject(e);
            }
        });
    }

}
