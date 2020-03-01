import { DatePipe } from '@angular/common';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'apiDate'
})
export class ApiDatePipe extends DatePipe implements PipeTransform {

    transform(dateObject: any, format: string): string {
        return super.transform(new Date(dateObject), format);
    }

}
