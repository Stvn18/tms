import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthModule } from '@services/oauth/oauth.module';
import { CommonServicesModule } from '@services/common/common.module';
import { ShippingModule } from '@services/shipping/shipping.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        OauthModule,
        CommonServicesModule,
        ShippingModule
    ]
})
export class ServicesModule {
}
