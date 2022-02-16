import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var jQuery: any;
declare var activeTable: any;

@Component({
  selector: 'app-disputes-ended',
  templateUrl: './ended.component.html',
  styleUrls: ['./ended.component.scss']
})
export class DisputesEndedComponent implements OnInit {

  @Input() idDocument: any;
  @Input() adminMaster!: boolean;
  @Output() totalAlertEnded = new EventEmitter<number>();

  totalAlerts = 0;
  arrayAlerts = [];

  constructor() { }

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
  }

  ngAfterViewInit() { }

}
