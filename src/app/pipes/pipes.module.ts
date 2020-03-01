import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDatePipe } from '@pipes/api-date.pipe';

@NgModule({
    declarations: [
        ApiDatePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ApiDatePipe
    ]
})
export class PipesModule {
}
