import { Component } from '@angular/core';
import { ToastActionResultService } from './toast-action-result.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'sh-toast-action-result',
    templateUrl: './toast-action-result.component.html',
    styleUrls: ['./toast-action-result.component.scss'],
})
export class ToastActionResultComponent {
    readonly message$: Observable<string>;
    readonly show$: Observable<boolean>;

    constructor(toastActionResultService: ToastActionResultService) {
        this.message$ = toastActionResultService.message$;
        this.show$ = toastActionResultService.show$;
    }
}
