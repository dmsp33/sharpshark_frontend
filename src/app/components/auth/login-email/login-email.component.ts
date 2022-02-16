import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


declare var $: any;

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {

  @Input() step!: number;
  @Input() method!: Function;
  @Output() upStep = new EventEmitter<number>();
  @Output() signInWithGoogle = new EventEmitter<string>();

  loginForm: FormGroup;
  msgGeneric: any = {};
  @BlockUI() blockUI!: NgBlockUI;

  fieldTextType: boolean = false;
  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  isValidInputUser: boolean = false;
  isValidInputPassword: boolean = false;


  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private _http: HttpClient
  ) { 
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(50), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password1: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
   
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onUpSteps(step:number) {
    this.upStep.emit(step);
  }

  onSignInWithGoogle() {
    this.signInWithGoogle.emit();
  }

  isValidInput(fieldName:string): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  comprobarUsuario() {
    this.isValidInputUser = this.isValidInput('user');
  }
  comprobarClave() {
    this.isValidInputPassword = this.isValidInput('password1');
  }

  // sendFormOther() {
  //   console.log('login with email')
  //   const user = { 
  //     email: this.loginForm.controls['user'].value, 
  //     password: this.loginForm.controls['password1'].value
  //   }


  //   this.authService.login(user).subscribe(response => {
  //     let res:any = response
  //     if (res.success) {
  //       this.route.navigate(['draft']);
  //       this.hideModal();
  //       this.onUpSteps(1) //Reiniciamos los pasos

  //     }
  //     this.blockUI.stop();
  //   })
  //   // this._http.get('http://127.0.0.1:8000/sanctum/csrf-cookie').subscribe(() => {

  //   //   this.authService.login(user).subscribe(res => {
  //   //     this.route.navigate(['draft']);
  //   //     this.hideModal();
  //   //   });

  //   //   })
  
  // }

  cleanForm() {
    this.fieldTextType = false;
    this.loginForm.patchValue({ user: '', password1: '' });
  }

  showModal(): void {
    this.cleanForm();
    $("#myModal").modal('show');
  }
  sendModal(): void {
    this.hideModal();
  }
  hideModal(): void {
    this.method();
  }

  login(){
    this.blockUI.start('Loading...');
    let user = { 
      email: this.loginForm.controls['user'].value, 
      password: this.loginForm.controls['password1'].value,
      provider: 'api',
    }

    this.authService.login(user).subscribe(response => {
      let res:any = response
      if (res.success) {
        
        this.hideModal();
        this.onUpSteps(1) //Reiniciamos los pasos
        window.location.reload();
        this.route.navigate(['draft']);

      }
      this.blockUI.stop();
    }, err => {
      console.log('error en login', err)
      this.blockUI.stop();
    });
  }

  

}
