import { Component } from '@angular/core';
import { SettingsType } from './models/settings-type.enum';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    selectedType: SettingsType = SettingsType.Account;
    // @ViewChild(ModalSafelistComponent) vsafelist: ModalSafelistComponent;

    title1: any;
    title2: any;
    active: boolean = false;

    readonly SettingsType = SettingsType;

    constructor() {
    }

    selectType(type: SettingsType): void {
        this.selectedType = type;
    }

    activeInfo() {
        this.active = !this.active;
    }

    showModalL() {
        // this.vsafelist.showModal()
    }
}
