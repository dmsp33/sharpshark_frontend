import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  mostrarBuscador = false;
  lang:string = 'en';
  haySesionActiva:boolean = false;

  constructor(public authService: AuthService,
    public translate: TranslateService) {
    this.haySesionActiva = this.authService.check();
  }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      this.haySesionActiva = this.authService.check();
    });
  }

  toggleMostrarBuscador() {
    this.mostrarBuscador = !this.mostrarBuscador
  }

  showModalL() {
    // this.laststep.showModal()
  }

  switchLang(lang) { 
    this.translate.use(lang);
    this.lang = lang;
  }

 
}
