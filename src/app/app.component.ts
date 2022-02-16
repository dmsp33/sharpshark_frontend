import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hasFullView: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
  ) {
    translate.addLangs(['en' , 'es']);
    translate.setDefaultLang('en');
    translate.currentLang = 'en';
   }

  ngOnInit() {
    this.setHasFullView();
  }

  private setHasFullView() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.hasFullView = params["hasFullView"] ?? false;
    });
    //FullView when route is certificate/
    
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if(this.router.url.includes('/certificate/')) this.hasFullView = true;
        }
      }
    );
    
  }
}
