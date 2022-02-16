import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subject, timer } from 'rxjs';
import { AuthService } from '../auth.service';
import { Documento } from './draft.service';
import { v4 as uuidv4 } from 'uuid';
import { startWith, switchMap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl:string = environment.baseUrl;
  private user_id!: number;
  private plagarismHeader:any = {}; //save token and scan_id
  private plagarism:any = {}; // save data
  private plagarism$!: Subject<any>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { 
    this.authService.getAuth().subscribe(auth => {
      this.user_id = auth.user.id;
    })

    this.plagarism$ = new Subject();
  }

  save(title:string, content:string, protegido:boolean = false): Observable<Documento> {
    let document= {
      titulo: title,
      contenido: content,
      user_id: this.authService.auth.user.id,
      version: 1,
      protegido: protegido,
      bloqueado:false
    }
    return this.http.post<Documento>(`${this.apiUrl}/api/documentos`, document);
  }


  getByUuid(uuid:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/documentos/${uuid}`);
  }

  update(documento: Documento): Observable<Documento> {
    return this.http.put<Documento>(`${this.apiUrl}/api/documentos/${documento.uuid}`, documento);
  }


  verifyPlagarism(documento:Documento) {
    
    this.http.get(`${this.apiUrl}/api/getAuthKey`).subscribe(res => {
      const data:any = res;
      this.plagarismHeader.accessToken= data.accessToken;

      const options = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.plagarismHeader.accessToken}`
        })
      }

      let formData = {
        title: documento.titulo,
        body: documento.contenido
      }
      this.http.post<string>(`${this.apiUrl}/api/copyleaks/submitFile`, formData, options).subscribe(res => {
        this.plagarismHeader.scan_id = res;

        this.waitForPlagarismResponse()
      })
    })
  }

  waitForPlagarismResponse() {
    if(this.plagarismHeader.scan_id) {
      
      const options = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.plagarismHeader.accessToken}`
        })
      }
      const formData = {
        scan_id: this.plagarismHeader.scan_id
      }

      const interval = setInterval(() => {
        this.http.post(`${this.apiUrl}/api/copyleaks/fakeBroadcast`, formData, options)
          .subscribe(res => {
            // console.log('buscar fraude', res)
            const data:any = res;
            if(data.completed) {
              // console.log('buscando datos', data)
              this.plagarism.completed = data.completed;
              this.plagarism.plagarism = data.plagarism;
              this.plagarism.percentage = data.percentage;
              this.plagarism.result = data.response;
              this.plagarism$.next(this.plagarism);

              clearInterval(interval)
            }
          }, err => console.log('error en buscar fraude', err))
      }, 10000)
    }
  }  

  crearCertificado(documento: Documento): Observable<Certificado> {
    const certificado = {
      user_id: this.authService.auth.user.id,
      autor: this.authService.auth.user.name,
      version: 1,
      titulo: documento.titulo,
      contenido: documento.contenido,
      uuid: documento.uuid, //uuidv4(),
      red: documento.red,
      traza: uuidv4(),
      ipfs: uuidv4(),
      //clave: documento.bloqueado ? uuidv4() : "",
      bloqueado: documento.bloqueado,
    }
    return this.http.post<Certificado>(`${this.apiUrl}/api/certificados`, certificado);
  }

  getCertificado(uuid:string): Observable<Certificado> {
    return this.http.get<Certificado>(`${this.apiUrl}/api/certificados/${uuid}`);
  }


  /** observables */
  GetPlagarism(): Observable<any> {
    return this.plagarism$.asObservable();
  }
}


export interface Certificado {
  id:         number;
  user_id:    number;
  version:    number;
  autor:      string;
  titulo:     string;
  contenido:  string;
  uuid:       string;
  red:        string;
  traza:      string;
  ipfs:       string;
  clave:      string;
  bloqueado:  boolean;
  created_at: string;
  updated_at: string;
}