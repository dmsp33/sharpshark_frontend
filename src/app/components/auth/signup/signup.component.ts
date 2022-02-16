import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TermsConditionsComponent } from '../../modal/terms-conditions/terms-conditions.component';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild(TermsConditionsComponent) termsConditions!: TermsConditionsComponent;

  @Input() step!: number;
  @Output() upStep = new EventEmitter<number>();
  @Output() signInWithGoogle = new EventEmitter<string>();

  signUpForm: FormGroup;
  @BlockUI() blockUI!: NgBlockUI;
  fieldTextType2!: boolean;
  fieldTextType1!: boolean;
  
  //alert
  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  letsMeet: boolean = true;
  letsMeetEmail!:string;
  isValidInputUser: boolean = false;
  isValidInputPassword: boolean = false;
  terminosYCondiciones: boolean = true;
  isValidInputAuthorName: boolean = false;
  isValidInputPasswordConfirm !: boolean;
  hayUnErrorConLosDatos: boolean = false;
  errorConLosDatos: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    // private apiService: ApiService,
    private http: HttpClient
  ) {
    this.terminosYCondiciones = false;

    this.signUpForm = this.fb.group({
      author_name: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(50), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]],
      repeat_password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]],
    }, { 
      // validator: MustMatch('password', 'repeat_password') 
    });
  }
  
  ngOnInit(): void {
  }

  onUpSteps(step:number) {
    this.letsMeet = true;
    this.upStep.emit(step ?? '2');
  }

  onSignInWithGoogle() {
    console.log('google boton')
    this.signInWithGoogle.emit();
  }

  isValidInput(fieldName:string): boolean {
    return this.signUpForm.controls[fieldName].invalid &&
      (this.signUpForm.controls[fieldName].dirty || this.signUpForm.controls[fieldName].touched);
  }


  sendFormSignUp() {
    this.blockUI.start('Processing');
    if (this.signUpForm.valid) {
      
      // let pass = btoa(this.signUpForm.get('password').value);
      
      let user = {
        name: this.signUpForm.controls['author_name'].value,
        email: this.signUpForm.controls['email'].value,
        password: this.signUpForm.controls['password'].value,
        repeat_password: this.signUpForm.controls['repeat_password'].value,
        provider: 'api',
      }

      this.authService.register(user).subscribe(response => {
        let res:any = response;

        if (res.success) {
          this.router.navigate(['draft']);
          this.hideModal();

          this.blockUI.stop();
        }
      }, err => {
        this.blockUI.stop();
        console.log('error en datos', err)
      });

      this.onUpSteps(1);
    } else {
      this.blockUI.stop();
      //lanzar mensajes de error
    }

  }


  cleanForm1() {
    this.fieldTextType2 = false;
    this.fieldTextType1 = false;
    this.signUpForm.patchValue({ author_name: '', email: '', password: '', repeat_password: '' });
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }


  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }




  showModalSignUp(): void {

    this.cleanForm1();
    $("#modalSignUp").modal('show');
  }
  sendModalSignUp(): void {

    //do something here
    this.hideModalSignUp();
  }
  hideModalSignUp(): void {
    $("#myModal1").modal('hide');
  }

  hideModal(): void {
    // this.cleanForm();
    this.step = 1;
    $("#myModal1").modal('hide');
  }

  ocultarLetsMeet(tipo:string) {
    if (tipo == 'team')
      this.letsMeetEmail = 'Work email';
    else
      this.letsMeetEmail = 'Personal email';

    this.letsMeet = false;
  }

  aceptarTerminosYCondiciones() {
    this.terminosYCondiciones = !this.terminosYCondiciones
  }

  comprobarUsuario() {
    this.isValidInputUser = this.isValidInput('email');
  }

  comprobarClave() {
    this.isValidInputPassword = this.isValidInput('password');
    this.isValidInputPasswordConfirm = (this.signUpForm.controls['repeat_password'].value != this.signUpForm.controls['password'].value);
  }

  comprobarNombre() {
    this.isValidInputAuthorName = this.isValidInput('author_name');
  }

  renviarEmailActivacion() {
    // let someShit = this.signUpService.resendSignUpEmail(this.usuarioRegistrado.id)
  }

  borrarCampo() {
    console.log('borrando campo')
    this.signUpForm.controls['repeat_password'].setValue('')
    this.signUpForm.controls['password'].setValue('')
    this.isValidInputPassword = false
    this.isValidInputPasswordConfirm = false
  }
  

  showTermsConditions() {
    this.termsConditions.showModal();
  }
}
