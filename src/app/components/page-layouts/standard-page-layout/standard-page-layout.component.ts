import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {
    StandardPageLayoutListDirective
} from '@components/page-layouts/standard-page-layout/standard-page-layout.directives';
import { CdkPortal, PortalHostDirective, TemplatePortal } from '@angular/cdk/portal';

@Component({
    selector: 'app-standard-page-layout',
    template: `
        <div fxLayout="row" fxLayoutAlign="center center">
            <mat-card>
                <mat-card-title>{{pageTitle}}</mat-card-title>
                <mat-card-content>
                    <mat-nav-list *ngIf="templateNavList">
                        <ng-template [ngIf]="templateNavList">
                            <ng-template [cdkPortalOutlet]="templateNavList"></ng-template>
                        </ng-template>
                    </mat-nav-list>
                    <ng-template cdk-portal>
                        <ng-content></ng-content>
                    </ng-template>
                    <div class="standard-page-layout-content" cdkPortalHost></div>
                </mat-card-content>
            </mat-card>
        </div>
        <button
                mat-fab
                aria-label="float action button"
                class="float-right-bottom-button"
                title="{{titleButton}}"
                (click)="onActionButton()"
                *ngIf="showFloatActionButton"
                [disabled]="floatActionButtonDisabled">
            <mat-icon>{{floatActionButtonIcon}}</mat-icon>
        </button>
    `,
    styles: [
            `
            :host {
                position: relative;
                display: flex;
                flex-direction: column;
                width: 100%;
                height: auto;
            }
            mat-card {
                width: 50%;
            }
            .standard-page-layout-content {
                padding: 15px;
            }
            .float-right-bottom-button {
                right: 38px;
                position: fixed;
                bottom: 58px;
                z-index: 100;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardPageLayoutComponent implements OnInit {

    /**
     * Establece la clase que tendra el componente
     */
    @HostBinding('attr.class')
    class = 'app-standard-page-layout';

    /**
     * Template para establecer listado en el contenido
     */
    @ContentChild(StandardPageLayoutListDirective, { static: true })
    templateNavList: StandardPageLayoutListDirective;

    /**
     * Título del contenido
     */
    @Input()
    pageTitle: string;

    /**
     * Titulo del botón flotante
     */
    @Input()
    titleButton: string;

    /**
     * Establece si muestra o no el botón flotante
     */
    @Input()
    showFloatActionButton = true;

    /**
     * Establece si se deshabilita o no el botón flotante
     */
    @Input()
    floatActionButtonDisabled = false;

    /**
     * Nombre del icono de botón
     */
    @Input()
    floatActionButtonIcon = 'add';

    /**
     * Establece la acción que va a realizar el boton flotante
     */
    @Output()
    readonly floatActionButtonOutput: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Template portal en donde se encuentra el contenido de la pagina
     */
    @ViewChild(CdkPortal, { static: true })
    templatePortal: TemplatePortal;

    /**
     * Host en donde se hará el volcado del contenido del templatePortal
     */
    @ViewChild(PortalHostDirective, { static: true })
    host: PortalHostDirective;

    constructor() {
    }

    onActionButton(): void {
        this.floatActionButtonOutput.emit();
    }

    ngOnInit(): void {
        this.host.attachTemplatePortal(this.templatePortal);
    }

}
