import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { ApplicationService } from '@services/application/application.service';

@Component({
    selector: 'app-root',
    template: `
        <app-toolbar-layout></app-toolbar-layout>
        <mat-progress-bar *ngIf="showProgressBar" mode="indeterminate"></mat-progress-bar>
        <div class="outlet-container">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent implements AfterViewChecked {

    showProgressBar = false;

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly cdRef: ChangeDetectorRef
    ) {
        this.applicationService
            .getStatusProgressBar()
            .subscribe(value => this.showProgressBar = value);
    }

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }

}
