import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        template: '<div class="tooltip" role="tooltip"><div class="arrow prueba-1-arrow"></div><div class="tooltip-inner prueba-1"></div></div>'
      })
    })

    if(!this.authService.check() && !localStorage.getItem('onboardingModal'))  $("#onboardingModal").modal('show');
  }

  showModalL() {
    $("#myModal1").modal('show');
  }

}
