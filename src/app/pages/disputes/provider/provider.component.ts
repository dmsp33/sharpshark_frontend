import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var jQuery: any;
declare var activeTable: any;

@Component({
  selector: 'app-disputes-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class DisputesProviderComponent implements OnInit {

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

        if ($('.scroll-content-y').length) {
          $('.scroll-content-y').mCustomScrollbar({
            theme: "dark-3",
            axis: "y" // horizontal scrollbar
          });
        }

      });
    })(jQuery);
  }

}
