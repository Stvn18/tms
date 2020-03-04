import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    CdkPortal,
    PortalHostDirective,
    TemplatePortal,
} from '@angular/cdk/portal';
import { StandardDialogLayoutActionsDirective } from './standard-dialog-layout-directives';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-standard-dialog-layout',
    templateUrl: './standard-dialog-layout.component.html',
    styleUrls: [ './standard-dialog-layout.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardDialogLayoutComponent implements OnInit {
    /**
     * Establece la clase que tendrá el componente
     */
    @HostBinding('attr.class')
    class = 'app-standard-dialog-layout';

    /**
     * Template para establecer los botones de las acciones del diálogo
     */
    @ContentChild(StandardDialogLayoutActionsDirective, { static: true })
    templateDialogActions: StandardDialogLayoutActionsDirective;

    /**
     * Indica si muestra el texto del título
     */
    @Input()
    showTitleText = true;

    /**
     * Establece el título del diálogo
     */
    @Input()
    dialogTitle: string;

    /**
     * Indica si muestra el loading del diálogo
     */
    @Input()
    loading = false;

    /**
     * Indica si muestra las acciones del diálogo
     */
    @Input()
    showDialogActions = true;

    /**
     * Indica si muestra el botón cancelar
     */
    @Input()
    showCancelButton = true;

    /**
     * Indica si se deshabilita el botón cancelar
     */
    @Input()
    cancelActionButtonDisabled = false;

    /**
     * Indica si muestra el botón aceptar
     */
    @Input()
    showActionButton = true;

    /**
     * Indica si se deshabilita el botón aceptar
     */
    @Input()
    actionButtonDisabled = false;

    /**
     * Establece la traducción del botón aceptar
     */
    @Input()
    dialogActionButtonTranslateKey = 'standardDialog.accept';

    /**
     * Establece la acción que va a realizar el botón aceptar
     */
    @Output()
    readonly dialogActionButtonOutput: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Establece la acción que va a realizar el botón cancelar
     */
    @Output()
    readonly dialogCancelButtonOutput: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Template portal en donde se encuentra el contenido del diálogo
     */
    @ViewChild(CdkPortal, { static: true })
    templatePortal: TemplatePortal;

    /**
     * Host en donde se hara el volcado del contenido del templatePortal
     */
    @ViewChild(PortalHostDirective, { static: true })
    host: PortalHostDirective;

    constructor(
        public dialogRef: MatDialogRef<any>,
    ) {
        dialogRef.addPanelClass('mat-dialog-without-padding');
    }

    ngOnInit(): void {
        this.host.attachTemplatePortal(this.templatePortal);
    }

    onCancel(): void {
        this.dialogCancelButtonOutput.emit();
    }

    onActionButton(): void {
        this.dialogActionButtonOutput.emit();
    }
}
