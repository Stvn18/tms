import { Injectable, Injector } from '@angular/core';
import { OauthService } from '@services/oauth/oauth.service';
import { OauthUserService } from '@services/oauth/oauth-user.service';
import { Observable } from 'rxjs';
import { OAuthUserInfoModel, UserModel } from '@models/user';

@Injectable()
export class OauthFacadeService {

    private lazyOauthService: OauthService;
    private lazyOauthUserService: OauthUserService;

    constructor(
        private readonly injector: Injector
    ) {
    }

    private get oauthService(): OauthService {
        if ( !this.lazyOauthService ) {
            this.lazyOauthService = this.injector.get(OauthService);
        }
        return this.lazyOauthService;
    }

    private get oauthUserService(): OauthUserService {
        if ( !this.lazyOauthUserService ) {
            this.lazyOauthUserService = this.injector.get(OauthUserService);
        }
        return this.lazyOauthUserService;
    }

    get tokenWithType(): Observable<string> {
        return this.oauthService.token();
    }

    isAuthenticated(): boolean {
        return this.oauthService.isAuthenticated();
    }

    get currentUserAuthenticated(): Observable<OAuthUserInfoModel> {
        return this.oauthService.currentUserAuthenticated();
    }

    login(user: UserModel): Promise<void> {
        return this.oauthService.authenticate(user);
    }

    logout(): Promise<void> {
        return this.oauthService.logout();
    }

    registerUser(user: UserModel): Promise<UserModel> {
        return this.oauthUserService.registerUser(user);
    }

}
