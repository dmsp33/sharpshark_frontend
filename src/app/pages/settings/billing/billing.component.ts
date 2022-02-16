import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-settings-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class SettingsBillingComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  articles: any = 50;
  value: any;
  cost: any;
  type: string = "USD";
  err: boolean = false;
  days: any = 30;

  datos: any;


  constructor() { }

  ngOnInit(): void {
  }

  calculate() {
  	if (this.value == 1) {
  		
  		this.articles = 50
  		this.cost = "100"

  	} else if ( this.value == 2 ) {
  		
  		this.articles = 300
  		this.cost = "500"
  	} else {

  		this.articles = 700
  		this.cost = "1000"
  	}
  }

  registerPay() {


    this.blockUI.start("Payment in process...");

    if (this.value == undefined) {
       setTimeout( () => {
        this.blockUI.stop();
        this.err = true;
      }, 2000);
      
    } else {
      let enviar = {

        "handler": "/core/registerPayOrder",
        "data": {

          "customer_email": sessionStorage.getItem('usrEmail'),
          "quantity": this.cost  ?? '500',
          "currency_symbol": this.type,
          "customer_name": sessionStorage.getItem('usrName')
        }

      };

      let pay = {

      }

      console.log(enviar);
    }

  }


}
