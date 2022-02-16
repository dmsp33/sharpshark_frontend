import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { ToastActionResultComponent } from './toast-action-result/toast-action-result.component';

const exportable = [TooltipDirective, ToastActionResultComponent];

@NgModule({
    declarations: [...exportable],
    imports: [
        CommonModule,
    ],
    exports: [...exportable],
})
export class BootstrapModule {
}
