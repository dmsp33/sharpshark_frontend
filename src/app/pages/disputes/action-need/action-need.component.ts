import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DisputeService } from 'src/app/shared/services/dispute.service';

declare var jQuery: any;
declare var activeTable: any;

@Component({
  selector: 'app-disputes-action-need',
  templateUrl: './action-need.component.html',
  styleUrls: ['./action-need.component.scss']
})
export class DisputesActionNeedComponent implements OnInit {

  @Input() idDocument: any;
  @Input() adminMaster!: boolean;
  @Output() totalAlertActionNeed = new EventEmitter<number>();
  @BlockUI() blockUI!: NgBlockUI;

  arrayAlerts:any = []
  totalAlerts = 0;

  constructor(
    private _disputeService: DisputeService
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

    this.blockUI.start('Processing');
    
    this._disputeService.GetAll()
    this._disputeService.getDisputes().subscribe(disputes => {
      console.log('Disputas obtenidas fron', disputes)
      this.arrayAlerts = disputes;
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
    });

  }

  ngAfterViewInit() { } 

}
