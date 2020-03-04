import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from '@services/application/application.service';
import { LocationService } from '@services/common/location/location.service';
import { CountryModel, DepartmentModel, LocationModel } from '@models/common/location';
import { PilotModel } from '@models/shipping/pilot';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {

    locationForm = new FormGroup({
        country: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
        zone: new FormControl('', Validators.required),
        avenue: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        comments: new FormControl('')
    });

    loading = false;
    countries: Array<CountryModel> = [];
    departments: Array<DepartmentModel> = [];

    constructor(
        private readonly dialogRef: MatDialogRef<LocationComponent>,
        private readonly locationService: LocationService,
        private readonly applicationService: ApplicationService
    ) {
    }

    ngOnInit(): void {
        this.countries = this.locationService.countries;
        this.locationForm
            .get('country')
            .valueChanges
            .subscribe(value => this.loadDepartments(value));
    }

    private loadDepartments(country: CountryModel): void {
        this.departments = this.locationService.departments
            .filter(d => d.country.code === country.code);
    }

    onSaveLocation(): void {
        this.loading = true;
        const location: LocationModel = {
            ...this.locationForm.getRawValue()
        };
        this.locationService
            .registerLocation(location)
            .then(() => this.dialogRef.close(true))
            .catch((exception: HttpErrorResponse) => this.applicationService.showSnackBar(exception.error, true))
            .finally(() => this.loading = false);
    }

    onCancel(): void {
        this.dialogRef.close();
    }

}
