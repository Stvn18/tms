import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Directive({
    selector: '[app-standard-page-list], [standardPageList]',
})
export class StandardPageLayoutListDirective extends CdkPortal {}
