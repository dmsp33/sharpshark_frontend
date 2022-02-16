import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DisputeService {

  private apiUrl:string = environment.baseUrl;
  public disputes$: Subject<any[]> = new Subject();

  constructor(
    private http: HttpClient,
    private _authService: AuthService,
  ) {
    // this.disputes$ = new Subject();
  }

  getDisputeFormData(alert_id, document_id): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Alert/Location/${alert_id}/${document_id}`);
  }

  createDispute(dispute:any): Observable<any> {

    const data = {
      user_id: this._authService.auth.id,
      ...dispute
    }
    // console.log('datos a enviar', data);
    return this.http.post<any>(`${this.apiUrl}/api/disputas/`, data);
  }

  update(data:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/disputas/${data.id}`, data);
  }

  GetAll(): void {

    if (this._authService.auth.token) {
      this.http.get<any>(`${this.apiUrl}/api/disputas`).subscribe(res =>{
        console.log('data obtenida', res.data);
        this.disputes$.next(res.data);
      })

    }
  }

  /** Observables */
  getDisputes(): Observable<any[]> {
    return this.disputes$.asObservable();
  }
}

export interface Dispute {
  alerta_id: number;
  claim_for: string;
  jurisdiction: string;
  discovered: string;
  screenshot: File;
  remove_content: boolean;
  acknowledge: boolean;
  pay_for_use: boolean;
  amount: string;
  money_type: string;
  conditions_default: boolean;
  certificate_authorship: string;
  screenshot_draft: File;
  in_question: string[];
  in_question_web_archive: string[];
  your_publication: string[];
  your_web_archive: string[];
}