import { Component, OnInit } from '@angular/core';
import { OnboardingType } from './models/onboarding-type.enum';

declare var $: any;

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
    step: OnboardingType = OnboardingType.FirstStep;
    disabled: boolean = false;
    AcceptTerms: boolean = false;

    readonly OnboardingType = OnboardingType;

    constructor() {
    }

    ngOnInit(): void {
        this.hideAlertClickOut();

        $('#onboardingModal').on('hidePrevented.bs.modal', function (e) {
            $('.alert.alert-clickOutside').show();
        })
    }

    switchView(step: OnboardingType): void {
        this.step = step;
    }

    showModal(): void {
        $('#onboardingModal').modal('show');
    }

    hideModal(): void {
        if (!this.disabled) {
            this.AcceptTerms = true;
        } else {
            localStorage.setItem('onboardingModal', 'true');

            $('#onboardingModal').modal('hide');
            this.step = OnboardingType.FirstStep;
        }
    }

    changeAcceptTerms(): void {
        this.disabled = !this.disabled;
    }

    hideAlertClickOut() {
        $('.alert.alert-clickOutside').hide();
    }
}
