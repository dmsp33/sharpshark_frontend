import { Directive, HostListener, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ToastActionResultService } from '../bootstrap/toast-action-result/toast-action-result.service';
import { TranslateService } from '@ngx-translate/core';

@Directive({
    selector: '[shCopy]',
})
export class CopyDirective {
    @Input('shCopy') value: string;

    constructor(
        private readonly clipboardService: ClipboardService,
        private readonly toastActionResultService: ToastActionResultService,
        private readonly translateService: TranslateService,
    ) {
    }

    @HostListener('click', ['$event'])
    copy(event: Event) {
        event.preventDefault();
        this.clipboardService.copy(this.value);

        const linkCopiedMessage = this.translateService.instant('common.link_copied');
        this.toastActionResultService.show(linkCopiedMessage);
    }
}
