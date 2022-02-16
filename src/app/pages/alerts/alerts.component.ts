import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/documentos/alert.service';
import { AlertType } from './models/alert-type.enum';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
    selectedType: AlertType = AlertType.New;

    totalNewAlerts: number = 0
    totalNotActualAlerts: number = 0;

    readonly AlertType = AlertType;

    constructor(
        private alertService: AlertService,
    ) {
    }

    ngOnInit(): void {
        //  (function ($) {
        //   $(document).ready(function () {
        //     $('.toggler-trigger').click(function (e) {

        //       e.preventDefault();

        //       $(this).toggleClass('active');
        //       $(this).closest('.toggler').toggleClass('active')
        //       //$(this).closest('.toggler').find('.toggler__content').stop().slideToggle();
        //       $(this).closest('.toggler').find('.toggler__content').toggle();
        //     })


        //   });
        // })(jQuery);

        this.alertService.getActual().subscribe(res => {
            const data: any = res;
            if (data) this.totalNewAlerts = data.total;
            this.totalNewAlerts = data.length == 0 ? 0 : data.length > 1 ? data.length - 1 : data.length;
        })
        this.alertService.getNotActual().subscribe(res => {
            const data: any = res;
            if (data) this.totalNotActualAlerts = data.total;
            this.totalNotActualAlerts = data.length == 0 ? 0 : data.length > 1 ? data.length - 1 : data.length;
        })

    }

    selectType(type: AlertType): void {
        this.selectedType = type;
    }
}
