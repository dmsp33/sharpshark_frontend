import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { DataFormattingService } from '../../helpers/data-formatting.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private apiUrl:string = environment.baseUrl;
  public actualAlerts!: any[];
  public actualAlerts$!: Subject<any[]>;
  public notActualAlerts!: any[];
  public notActualAlerts$!: Subject<any[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private dataFormatting: DataFormattingService,
  ) {
    this.actualAlerts$ = new Subject();
    this.notActualAlerts$ = new Subject();
  }

  GET_ACTUAL() {
    if (this.authService.auth.token) {
      return this.http.get(`${this.apiUrl}/api/Alert/wfgetActualAlerts`).subscribe(res => {
        const data:any = res;
        this.actualAlerts = data ?? [];
        this.actualAlerts['groupByDate'] = this.dataFormatting.groupByDate(this.actualAlerts, 'documento_id');
        // console.log('obteniendo alertas', this.actualAlerts)
        this.actualAlerts$.next(this.actualAlerts);
      });
    }
    return [];
  }
  GET_NOT_ACTUAL() {
    if (this.authService.auth.token) {
      return this.http.get(`${this.apiUrl}/api/Alert/wfgetNotActualAlert`).subscribe(res => {
        const data:any = res;
        this.notActualAlerts = data ?? [];
        this.notActualAlerts['groupByDate'] = this.dataFormatting.groupByDate(this.notActualAlerts, 'documento_id');
        this.notActualAlerts$.next(this.notActualAlerts);
      });
    }

    return [];
  }
  
  update(id): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/Alert/update/${id}`, '');
  }


  /** Modificaciones  */
  changeActualToNotActual(data: any, group:string) {
    // this.deleteAlertItem(data, group);

    // this.notActualAlerts[group].push(data);
    // this.notActualAlerts[group].sort();
    this.notActualAlerts['total'] ++;
    this.notActualAlerts$.next(this.notActualAlerts);
  }

  deleteAlertItem(data: any, group:string) {
    this.actualAlerts[group][0] = this.actualAlerts[group][0].filter(item => item.id != data.id);
    this.actualAlerts['total'] --;
    this.actualAlerts$.next(this.actualAlerts);
  }

  changeNotActualToActual(data: any, group:string) {
    // this.deleteNotActualAlertItem(data, group);

    // this.actualAlerts[group].push(data);
    // this.actualAlerts[group].sort();
    this.actualAlerts['total'] ++;
    this.actualAlerts$.next(this.actualAlerts);
  }

  deleteNotActualAlertItem(data: any, group:string) {
    this.notActualAlerts[group][0] = this.notActualAlerts[group][0].filter(item => item.id != data.id);
    this.notActualAlerts['total'] --;
    this.notActualAlerts$.next(this.notActualAlerts);
  }


  /** Observables */
  getActual(): Observable<any[]> {
    return this.actualAlerts$.asObservable();
  }
  getNotActual(): Observable<any[]> {
    return this.notActualAlerts$.asObservable();
  }
}
