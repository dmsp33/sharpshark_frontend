import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-settings-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class SettingsAccountComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  lang:any;
  user:any;

  constructor(
     private router: Router,
     private authService: AuthService
  ) { 
    this.user = this.authService.auth.user;
  }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth && auth.user) this.user = auth.user;
    });
  }

  switchLang() {

  }


  logoutUser() {
    this.blockUI.start('Processing');

    this.authService.logout().subscribe(res => {
      // console.log(res)
      this.router.navigate(['/demo']);
    });

    this.blockUI.stop();
  }

}
