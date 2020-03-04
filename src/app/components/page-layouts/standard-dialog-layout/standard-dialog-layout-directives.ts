import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[app-standard-dialog-actions], [standardDialogActions]',
})
export class StandardDialogLayoutActionsDirective extends CdkPortal {}
