import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthContentGuard } from '@guards/auth-content.guard';
import { PrivateContentGuard } from '@guards/private-content.guard';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        AuthContentGuard,
        PrivateContentGuard,
    ]
})
export class GuardsModule {
}
