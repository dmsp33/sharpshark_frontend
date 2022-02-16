import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalSafeListComponent } from 'src/app/components/modal/safe-list/safe-list.component';

declare var jQuery: any;

@Component({
  selector: 'app-document-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class DocumentAboutComponent implements OnInit {

  @Input() datasets: any;
  @Input() stoptracking: any;
  @ViewChild(ModalSafeListComponent) vsafelist!: ModalSafeListComponent;


  titleDocument='';
  version=''
  titleVersion='';
  msgFooter1='';
  id='';
  dateCreate='';
  hourCreate='';
  dateUpdate='';
  hourUpdate='';
  protectedDate='';
  protectedHour='';
  versiones:any;
  statusMonitoreo='';
  hourTranscurridas='';
  totalAlerts=0;
  totalAlertDisputasOpen=0;
  AlertActionNeededDisputas=0;
  titleAlerts=''
  titleAlertsActionNeed='';
  titlestatus=''
  
  /** Nueva variable */
  documento:any;

  constructor(
    private route: Router,
  ) { }


  ngOnInit(): void {
   
    (function ($) {
      $(document).ready(function () {        
        $('.scroll-content-y').mCustomScrollbar({
          theme: "dark-3",
          axis: "y" // horizontal scrollbar
        });

      });
    })(jQuery);

    //console.log("datasets ", this.datasets)
    // this.titleDocument= this.datasets[0].title;
    // this.version = this.datasets[0].version;
    // this.titleVersion=this.datasets[0].titleVersion;
    // this.msgFooter1=this.datasets[0].msgFooter;
    // this.id=this.datasets[0].id;
    // this.dateCreate=this.datasets[0].dateCreate;
    // this.hourCreate=this.datasets[0].hourCreate;
    // this.dateUpdate=this.datasets[0].dateUpdate;
    // this.hourUpdate=this.datasets[0].hourUpdate;
    // this.protectedDate= this.datasets[0].protectedDate,
    // this.protectedHour=this.datasets[0].protectedHour,
    // this.versiones = this.datasets[0].versiones,
    // this.hourTranscurridas=this.datasets[0].hourTranscurridas,
    // this.totalAlerts=this.datasets[0].totalAlerts,
    // this.totalAlertDisputasOpen=this.datasets[0].totalAlertDisputasOpen,
    // this.AlertActionNeededDisputas=this.datasets[0].AlertActionNeededDisputas
    this.documento = this.datasets[0];

    if (this.totalAlerts == 0 && this.totalAlertDisputasOpen==0){
      this.titleAlerts = "No alerts, no disputes"
    }

    if (this.totalAlerts == 1 && this.totalAlertDisputasOpen==1){
      this.titleAlerts = "An unresolved alert, an open dispute"
    }

    if (this.totalAlerts > 0 || this.totalAlertDisputasOpen > 0){
      this.titleAlerts = this.totalAlerts.toString()+" unresolved alerts, "+this.totalAlertDisputasOpen.toString()+" open disputes"
    }

    if (this.AlertActionNeededDisputas == 0){
      this.titleAlertsActionNeed = "Action needed, NOTHING"
    }

    if (this.AlertActionNeededDisputas == 1){
      this.titleAlertsActionNeed = "Action needed on disputes."
    }

    if (this.AlertActionNeededDisputas  > 0){
      this.titleAlertsActionNeed = this.AlertActionNeededDisputas.toString()+" actions needed on disputes"
    }
  }

  addNewVersion(id) {
    this.route.navigate(['/editDraft', id]);
  }

  viewDcoument(id) {
    this.route.navigate(['/viewDoc', id]);
  }

  downloadReport(idNote) { 
  }

  showModalL() {
    this.vsafelist.showModal()
  }
}
