import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationService } from '@services/application/application.service';
import { ShippingFacadeService } from '@services/shipping/shipping-facade.service';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { Router } from '@angular/router';
import { TrunkModel } from '@models/shipping/trunk';
import { LocationModel } from '@models/common/location';
import { PackageModel } from '@models/shipping/package';
import { LocationService } from '@services/common/location/location.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PackageDialogComponent } from '../package-dialog/package-dialog.component';
import { ShippingModel } from '@models/shipping/shipping';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-create-shipping',
    templateUrl: './create-shipping.component.html'
})
export class CreateShippingComponent implements OnInit {

    shippingForm = new FormGroup({
        trunk: new FormControl('', Validators.required),
        origin: new FormControl('', Validators.required),
        destination: new FormControl('', Validators.required),
        phoneReference: new FormControl('', Validators.required),
        paymentType: new FormControl('', Validators.required),
        total: new FormControl(0, Validators.required)
    });

    trunks: Array<TrunkModel> = [];
    origins: Array<LocationModel> = [];
    destinations: Array<LocationModel> = [];
    packages: Array<PackageModel> = [];
    displayedColumns: string[] = [ 'code', 'weight', 'description' ];

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly shippingFacadeService: ShippingFacadeService,
        private readonly locationService: LocationService,
        private readonly oauthFacadeService: OauthFacadeService,
        private readonly router: Router,
        private readonly dialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
    }

    async ngOnInit() {
        try {
            this.applicationService.showProgressBar();
            this.trunks = await this.shippingFacadeService.getAllTrunks();
            this.origins = await this.locationService.getAllLocations();
            this.destinations = await this.locationService.getAllLocations();
            this.applicationService.hideProgressBar();
        } catch ( exception ) {
            if ( exception.status === 401 ) {
                this.applicationService.showSnackBar('Se ha finalizado la sesión', false);
                await this.oauthFacadeService.logout();
                await this.router.navigateByUrl('/auth/login');
            } else {
                this.applicationService.showSnackBar(exception.error, true);
            }
        }
    }

    getTotalPackages(): number {
        return this.packages.length;
    }

    saveShipping(): void {
        this.applicationService.showProgressBar();
        const newShipping: ShippingModel = {
            ...this.shippingForm.getRawValue(),
            packages: this.packages,
            quantityPackages: this.getTotalPackages()
        };
        this.shippingForm.disable();
        this.shippingFacadeService
            .createNewShipping(newShipping)
            .then(async () => {
                this.applicationService.showSnackBar('Envío registrado exitosamente', false);
                await this.router.navigateByUrl('/dashboard');
            })
            .catch(async (exception: HttpErrorResponse) => {
                if ( exception.status === 401 ) {
                    this.applicationService.showSnackBar('Se ha finalizado la sesión', false);
                    await this.oauthFacadeService.logout();
                    await this.router.navigateByUrl('/auth/login');
                } else {
                    this.applicationService.showSnackBar(exception.error, true);
                }
            })
            .finally(() => {
                this.shippingForm.enable();
                this.applicationService.hideProgressBar();
            });
    }

    createPackage(): void {
        this.dialog.open(PackageDialogComponent, {
            width: '50%',
            height: '60%',
            panelClass: 'mat-dialog-without-padding',
            disableClose: true
        })
            .afterClosed()
            .subscribe(result => {
                if ( result ) {
                    const packagesAux = this.packages.map(x => Object.assign({}, x));
                    packagesAux.push(result);
                    this.packages = packagesAux;
                    this.changeDetectorRefs.detectChanges();
                    this.applicationService.showSnackBar('Paquete agregado exitosamente!', false);
                }
            });
    }

}
