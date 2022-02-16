import { Component, OnInit } from '@angular/core';
import { DisputeType } from './models/dispute-type.enum';
import { DisputeService } from 'src/app/shared/services/dispute.service';

declare var scrollList: any;
declare var jQuery: any;
declare var loadJs: any;
declare var loadJs1: any;

@Component({
    selector: 'app-disputes',
    templateUrl: './disputes.component.html',
    styleUrls: ['./disputes.component.scss'],
})
export class DisputesComponent implements OnInit {
    selectedType: DisputeType = DisputeType.ActionNeed;

    totalActionNeed = 0;
    totalWebsite = 0;
    totalProvider = 0;
    totalSearchEngine = 0;
    totalEnded = 0;
    active: boolean = false;
    showOnlyLogged = false;
    case1 = 0; //Resolved and not actual cases
    case2 = 0; //The cases below have been marked as no longer important
    case3 = 0; //Good news! Some content was removed
    typeSelect = 1;
    authMaster: boolean = false;
    logged: boolean = false;

    readonly DisputeType = DisputeType;

    constructor(
        private _disputeService: DisputeService,
    ) {
    }

    ngOnInit(): void {
        this._disputeService.getDisputes().subscribe(disputes => {
            this.totalActionNeed = disputes.length;
        })

        this.updateTotales();
    }

    selectType(type: DisputeType): void {
        this.selectedType = type;
    }

    calculateClassesToggle() {
        if (this.case1 > 0) {
            return 'info info__item info__item_width info__item_blue';
        } else if (this.case2 > 0) {
            return 'info info__item info__item_width info__item_blue';
        } else {
            return 'info info__item info__item_width info__item_green';
        }
    }

    activeInfo() {
        this.active = !this.active;
    }

    updateTotales() {
        this.getTotalAlertsForUserActionNeed()
        this.getTotalAlertsForUserWebSite();
        this.getTotalAlertsForUserProvider();
        this.getTotalAlertsForUserSearchEngine();
        this.getTotalAlertsForUserEnded()
    }

    getTotalAlertsForUserWebSite() {
        let typeStatus = 1; //LISTAR TODOS LAS ALERTAS POR DOCUMENTO
        let status = '5';
    }

    getTotalAlertsForUserActionNeed() {
        let typeStatus = 1; //LISTAR TODOS LAS ALERTAS POR DOCUMENTO
        let status = '4';
    }

    getTotalAlertsForUserProvider() {
        let typeStatus = 1; //LISTAR TODOS LAS ALERTAS POR DOCUMENTO
        let status = '6';
    }

    getTotalAlertsForUserSearchEngine() {
        /*
        1  = ALERTA NUEVAS
            2  = ALERTA INACTIVA / INACTIVE
            3  = ALERTA NO ACTUAL / NOT CURRENT
            4  = ALERTA RESOLUCION DE DISPUTA / DISPUTE RESOLUTION
            5  = ALERTA CON WARNING ENVIADA WEBSITE /
            6  = ALERTA CON WARNING ENVIADA PROVIDER
            7  = ALERTA FINALIZADA
            8  = ALERTA OMITIDA
            9  = ALERTA MARCADO COMO VISTA
            10 = ALERTA CON WARNING ENVIADA SEARCH ENGINER
        */

        let typeStatus = 1; //LISTAR TODOS LAS ALERTAS POR DOCUMENTO
        let status = '10';
    }

    getTotalAlertsForUserEnded() {
        let typeStatus = 1; //LISTAR TODOS LAS ALERTAS POR DOCUMENTO
        let status = '7';
    }
}
