import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { OauthService } from '@services/oauth/oauth.service';
import { OauthUserService } from '@services/oauth/oauth-user.service';
import { LogService } from '@services/oauth/log.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        OauthFacadeService,
        OauthUserService,
        OauthService,
        LogService
    ]
})
export class OauthModule {
}
