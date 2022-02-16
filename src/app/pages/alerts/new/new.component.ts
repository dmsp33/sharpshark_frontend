import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/documentos/alert.service';

declare var jQuery: any;
declare var activeTable: any;

@Component({
  selector: 'app-alerts-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class AlertsNewComponent implements OnInit {

  @Input() idDocument: any;
  @Output() totalNewAlertas = new EventEmitter();
  

  newAlerts = 0
  totalAlerts = 0
  totalAlertsToday = 0;
  totalAlertsEarlyWeek = 0;
  totalAlertsEarlyMonth = 0;
  totalAlertsMonth = 0;
  @BlockUI() blockUI!: NgBlockUI;
  alertas:any = [];
  dataToday: any = [];
  dataWeek: any = [];
  dataMonth: any = [];
  dataEvenEarlier: any = [];

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function () {


        activeTable();

        $('.scroll-content').mCustomScrollbar({
          theme: "dark-3",
          axis: "x" // horizontal scrollbar
        });


        if ($('.table-scroll-x').length) {
          $('.table-scroll-x').mCustomScrollbar({
            theme: "dark-3",
            axis: "x" // horizontal scrollbar
          });
        }

        if ($('.scroll-content-y').length) {
          $('.scroll-content-y').mCustomScrollbar({
            theme: "dark-3",
            axis: "y" // horizontal scrollbar
          });
        }

      });
    })(jQuery);

    this.getListOfAlertsForUser();
  }

  ngAfterViewInit() {}


  getListOfAlertsForUser() {
    this.blockUI.start('processing');
    
    if(this.authService.check())  {
      (async () => {
        this.alertService.GET_ACTUAL();
        this.alertService.getActual().subscribe(res => {
          const data:any = res;
          this.alertas = data?.groupByDate;
          this.dataToday = this.alertas.today;
          this.dataWeek = this.alertas.week;
          this.dataMonth = this.alertas.month;
          this.dataEvenEarlier = this.alertas.even_earlier;

          this.totalAlerts = data.length > 1 ? data.length : data.length -1;

          console.log('alertas nuevas', this.dataEvenEarlier, this.dataEvenEarlier.length)
          this.blockUI.stop();
        }, err => this.blockUI.stop())
      })()
    } else {
      this.blockUI.stop();
    }
  }

  changeActualStatus(data) {
    console.log('cambiando estatus a ', data)
    this.blockUI.start('Processing...');

    this.alertService.update(data.document.id).subscribe(res => {
        this.getListOfAlertsForUser()
      }, err => this.blockUI.stop());

    this.alertService.changeActualToNotActual(data.document, data.group);
  }
}
