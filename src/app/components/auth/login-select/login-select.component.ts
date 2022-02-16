import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GoogleAuthService } from 'ng-gapi';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginEmailComponent } from '../login-email/login-email.component';

declare var $: any;

@Component({
  selector: 'app-login-select',
  templateUrl: './login-select.component.html',
  styleUrls: ['./login-select.component.scss']
})
export class LoginSelectComponent implements OnInit {

  step:number = 1;
  error: any;
  showOnlyLogged = false;
  msgGeneric: any = {};
  @BlockUI() blockUI!: NgBlockUI;
  needsToShowOnboarding: boolean = false;
  hasFullView:boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private googleAuth: GoogleAuthService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.needsToShowOnboarding && !this.hasFullView) {
      // Mostrar modal de onboard
      // this.onboard.showModal()
    }
  }

  async authenticate() {
    // Logear mediante google
    this.blockUI.start('Loading');
   
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(
          res => {this.authService.signInSuccessHandler(res)}, 
          err => {
            console.log('login fail', err)
            this.blockUI.stop();
          }
        );
      });

    this.authService.getAuth().subscribe(auth => {
      if(this.authService.check() && auth.id && auth.user.name) {
        this.hideModal();
        this.blockUI.stop();
        window.location.reload();
        this.router.navigate(['/draft']);
      }
    });
  }
  logoutUser() {
    this.router.navigate(['/demo']);
  }

  hideModal(): void {
    this.step = 1;
    $("#myModal1").modal('hide');
    $("#alertaActivacion").hide();
  }

  showModal(): void {
    $("#myModal1").modal('show');
  }

  updateSteps(step:number) {
    this.step = step;
  }
  steps(n:number) {
    n = n * 1;
    this.step = n;

  }

  setHasFullView() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.hasFullView = params["hasFullView"] ?? false;
    });
  }
}
