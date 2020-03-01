import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServicesModule } from '@services/services.module';
import { GuardsModule } from '@guards/guards.module';
import { ComponentsModule } from '@components/components.module';
import { AppAuthModule } from './main/app-auth/app-auth.module';
import { PrivateContentModule } from './main/private-content/private-content.module';
import { PublicContentModule } from './main/public-content/public-content.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApplicationService } from '@services/application/application.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),

        // Módulo de servicios de la app
        ServicesModule,

        // Módulo para la autenticación
        AppAuthModule,

        // Módulo para contenido privado
        PrivateContentModule,

        // Módulo para contenido público
        PublicContentModule,

        // Módulo para los guardias de rutas
        GuardsModule,

        // Módulo de componentes compartidos
        ComponentsModule,
        RouterModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        MatSnackBarModule
    ],
    bootstrap: [ AppComponent ],
    providers: [
        ApplicationService
    ]
})
export class AppModule {
}
