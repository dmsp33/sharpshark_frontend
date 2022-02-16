import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var jQuery: any;
declare var activeTable: any;

@Component({
  selector: 'app-disputes-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class DisputesWebsiteComponent implements OnInit {

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
