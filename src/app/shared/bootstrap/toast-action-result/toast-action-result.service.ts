import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const autoCloseTimeMs = 1500;

@Injectable({
    providedIn: 'root',
})
export class ToastActionResultService {
    show$: Observable<boolean> = new BehaviorSubject(false);
    message$: Observable<string> = new BehaviorSubject('');

    show(message: string): void {
        this.setMessage(message);
        this.setShowState(true);
        setTimeout(() => {
            this.setShowState(false);
        }, autoCloseTimeMs);
    }

    private setMessage(message: string): void {
        (this.message$ as BehaviorSubject<string>).next(message);
    }

    private setShowState(isShow: boolean): void {
        (this.show$ as BehaviorSubject<boolean>).next(isShow);
    }
}
