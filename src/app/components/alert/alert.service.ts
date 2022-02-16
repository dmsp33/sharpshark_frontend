import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = false;
          } else {
              // clear alert messages
              this.clear();
          }
      }
    });
  }


  // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
      return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  error(message: string, options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // main alert method    
  alert(alert: Alert) {
      alert.id = alert.id || this.defaultId;
      this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
      this.subject.next(new Alert({ id }));
  }
}
