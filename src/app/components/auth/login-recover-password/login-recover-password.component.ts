import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-recover-password',
  templateUrl: './login-recover-password.component.html',
  styleUrls: ['./login-recover-password.component.scss']
})
export class LoginRecoverPasswordComponent implements OnInit {

  @Input() step!: number;
  @Output() upStep = new EventEmitter<number>();
  fieldTextType!: boolean;
  correoUsuario!: String;
  accionando: boolean = false;
  error: boolean = false;
  fieldTextType2!: boolean;
  fieldTextType1!: boolean;

  formEmail: String = '';
  formPassword: String = '';
  formRepeatPassword: String = '';
  isValidInputUserRecover!: boolean;
  isValidInputPasswordRecover!: boolean;
  isValidInputPasswordConfirmRecover!: boolean;
  idUser!: string;
  disabled: boolean = false;
  idHash!: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onUpSteps(step:number) {
    this.upStep.emit(step);
  }

  envairFormulario() {
    // sendPasswordRecoveryEmail
  }

  comprobarUsuario() {
    this.isValidInputUserRecover = (this.formEmail != '') ? false : true;
  }

  comprobarClave() {
    this.isValidInputPasswordRecover = (this.formPassword.length < 7) ? true : false;
  }
  comprobarRepetirClave() {
    this.isValidInputPasswordConfirmRecover = (this.formRepeatPassword != this.formPassword) ? true : false;
  }

  cambiarClave() {
    this.disabled = true
    // recoverPassword
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }


  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  borrarCampo(){
    this.formPassword = ''
    this.formRepeatPassword = ''
    this.isValidInputPasswordRecover = false
    this.isValidInputPasswordConfirmRecover = false
  }

}
