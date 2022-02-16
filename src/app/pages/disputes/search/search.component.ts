import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var jQuery: any;
declare var activeTable: any;

@Component({
  selector: 'app-disputes-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class DisputesSearchComponent implements OnInit {

  @Input() idDocument: any;
  @Input() adminMaster!: boolean;
  @Output() totalAlertActionNeed = new EventEmitter<number>();

  arrayAlerts = []
  totalAlerts = 0;

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
