import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/documentos/alert.service';
import { DraftService } from 'src/app/shared/services/documentos/draft.service';
import { LoginSelectComponent } from '../../auth/login-select/login-select.component';
import { DisputeService } from 'src/app/shared/services/dispute.service';

@Component({
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.scss']
})
export class VerticalNavComponent implements OnInit {

  @ViewChild(LoginSelectComponent) loginSelect!: LoginSelectComponent;
  showOnlyLogged = false;
  countProtected: number = 0;
  countDraft: number = 0;
  countAlerts: number = 0;
  countNewAlerts: number = 0;
  countOpenDisputes: number = 0;
  countActionNeed: number = 0;
  countDisputesResolved: number = 0;
  hoursClaim: number = 0
  busquedasRestantes: number = 0;


  status: boolean = false;
  mostrarOcultar: boolean = false;
  authMaster: boolean = false;
  token: any;
  showIfLogged$;
  
  //are
  @BlockUI() blockUI!: NgBlockUI;
  user:any;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private draftService: DraftService,
    private alertService: AlertService,
    private disputeService: DisputeService,

  ) {
    this.showOnlyLogged = this.authService.check();
    this.user = this.authService.auth.user;

    if(this.user && this.authService.auth.token) {
      this.user.initials = this.getInitials(this.user?.name);
      this.draftService.GET_ALL();
      this.draftService.all().subscribe(documentos => {
        const data:any = documentos;
        this.countDraft = data.total ?? 0;
      });
      this.draftService.GET_ALL_PROTECTED();
      this.draftService.allProtected().subscribe(documentos => {
        const data:any = documentos;
        this.countProtected = data.total ?? 0;
      });
      this.alertService.GET_ACTUAL();
      this.alertService.GET_NOT_ACTUAL();
      this.alertService.getActual().subscribe(res => {
        const data:any = res;
//        this.countNewAlerts = data.length == 0 ? 0 : data.length > 1 ? data.length -1:data.length ;
        this.countNewAlerts = data.length;
        // if(data) this.countAlerts = data.today.length + data.week.length + data.month.length + data.even_earlier.length;
      });
      this.alertService.getNotActual().subscribe(res => {
        const data:any = res;
//        this.countAlerts = data.length == 0 ? 0 : data.length > 1 ? data.length -1:data.length ;
        this.countAlerts = data.length;
        // if(data) this.countNewAlerts = data.today.length + data.week.length + data.month.length + data.even_earlier.length;
      });
      this.disputeService.getDisputes().subscribe(disputes => {
            this.countActionNeed = disputes.length;
      })

    } 
  }
  
  ngOnInit(): void {
    this.authService.getAuth().subscribe(data => {
      if(data) {
        this.showOnlyLogged = this.authService.check();
        this.user = data.user;
        this.user.initials = this.getInitials(this.user.name);
        
      }
    })
  }

  logoutUser() {  
    
    this.blockUI.start('Processing');
    (async () => {
  
      this.authService.logout().subscribe(res => {
        this.router.navigate(['/demo']);
        this.draftService.initial();
        this.getTotalAlertsForUser();
        this.blockUI.stop();
      }, err => this.blockUI.stop());
      
    })();
  }


  getTotalDocumentDraft() {
    this.countDraft = 0;
  }

  getTotalDocumentProtected() {
    this.countProtected = 0
  }

  getTotalAlertsForUser() {
    //ALERTA MARCADO COMO VISTA
    this.countAlerts = 0;

    //ALERTA NUEVAS
    this.countNewAlerts = 0;

    //consultar disputas abiertas
    this.countOpenDisputes = 0;

    //consultar disputas de accion necesaria
    this.countActionNeed = 0;

    //consultar disputas resueltas
    this.countDisputesResolved = 0;

    //consultar disputas resueltas
    this.hoursClaim = 0;
  }


  loadCountDocument() {
    this.countDraft = 0;
    this.countProtected = 0;
    this.countAlerts = 0;
    this.countOpenDisputes = 0;
    this.countActionNeed = 0;
    this.countDisputesResolved = 0;
  }
  showModalL() {
    this.loginSelect.showModal();
  }
  
  clickEvent() {
    this.status = !this.status;
  }

  mostrarOcultarMenuSalir() {
    this.mostrarOcultar = !this.mostrarOcultar
  }

  getInitials(palabra: string) {
    if(!palabra) return '';
    let palabras = palabra.split(" ")
    let initials = ""


    if (palabras.length > 1) {
      let fstChar = palabras[0].charAt(0);
      let fstChar1 = palabras[1].charAt(0);
      initials = fstChar + fstChar1;

    } else if (palabras.length > 0) {
      initials = palabras[0].charAt(0)
    }


    return initials;
  }
}
