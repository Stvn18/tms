import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApplicationService {

    private readonly showToolbarSubject = new BehaviorSubject<boolean>(true);
    private readonly progressBarSubject = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly matSnackBar: MatSnackBar
    ) {
    }

    showProgressBar(): void {
        this.progressBarSubject.next(true);
    }

    hideProgressBar(): void {
        this.progressBarSubject.next(false);
    }

    getStatusProgressBar(): Observable<boolean> {
        return this.progressBarSubject.asObservable();
    }

    showToolbar(): void {
        this.showToolbarSubject.next(true);
    }

    hideToolbar(): void {
        this.showToolbarSubject.next(false);
    }

    getStatusToolbar(): Observable<boolean> {
        return this.showToolbarSubject.asObservable();
    }

    showSnackBar(message: string, isError: boolean): void {
        this.matSnackBar.open(message, 'OK', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: isError ? 'snackbar-error' : 'snackbar-success'
        });
    }

}
