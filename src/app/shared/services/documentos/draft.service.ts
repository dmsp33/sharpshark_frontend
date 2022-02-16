import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataFormattingService } from '../../helpers/data-formatting.service';
import { AuthService } from '../auth.service';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DraftService {
  private apiUrl:string = environment.baseUrl;
  private _documents!: [];
  public documentos!: Documento[];
  public documentos$!: Subject<Documento[]>;
  public documentosEliminados!: Documento[];
  public documentosEliminados$!: Subject<Documento[]>;

  public documentosProtegidos!: Documento[];
  public documentosProtegidos$!: Subject<Documento[]>;
  public documentProtectNotTracking!: Documento[];
  public documentProtectNotTracking$!: Subject<Documento[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private dataFormatting: DataFormattingService,
  ) {
    this.documentos$ = new Subject();
    this.documentosEliminados$ = new Subject();
    this.documentosProtegidos$ = new Subject();
    this.documentProtectNotTracking$ = new Subject();

    this.authService.getAuth().subscribe(auth => {
      if(this.authService.check()) {
        this.GET_ALL();
        this.GET_ALL_DELETED();
      }
    })
  }

  GET_ALL() {
    if(this.authService.auth.token) {
      return this.http.get(`${this.apiUrl}/api/documentos`).subscribe(res => {
        const data:any = res;
        const documents = data.data ?? [];
        
        this.documentos = documents //documents.filter(item => item.protegido == false);
        this.documentos['groupByDate'] = this.dataFormatting.groupByDate(data.data.all);
        this.documentos$.next(this.documentos);
        
        // this.documentosProtegidos = documents.filter(item => item.protegido && !item.monitoring);
        // this.documentosProtegidos$.next(this.documentosProtegidos);

        // this.documentProtectNotTracking = documents.filter(item => item.protegido && item.monitoring);
        // this.documentProtectNotTracking$.next(this.documentProtectNotTracking);
      });
    }

    return [];
  }
  GET_ALL_DELETED() {
    if(this.authService.auth.token) {
      return this.http.get(`${this.apiUrl}/api/documentos-eliminados`).subscribe(res => {
        const data:any = res;
        const documents = data.data ?? [];

        this.documentosEliminados = documents;//documents.filter(item => item.protegido == false);
        this.documentosEliminados['groupByDate'] = this.dataFormatting.groupByDate(data.data.all);
        this.documentosEliminados$.next(this.documentosEliminados);
        
        // this.documentProtectNotTracking = documents.filter(item => item.protegido == true);
        // this.documentProtectNotTracking$.next(this.documentProtectNotTracking);
      });
    }

    return [];
  }
  GET_ALL_PROTECTED() {
    if (this.authService.auth.token) {
      return this.http.get(`${this.apiUrl}/api/protected-documents`).subscribe(res => {
        const data:any = res;
        this.documentosProtegidos = data.data ?? [];
        this.documentosProtegidos['groupByDate'] = this.dataFormatting.groupByDate(data.data.all);
        this.documentosProtegidos$.next(this.documentosProtegidos);
      });
    }

    return [];
  }
  GET_ALL_PROTECTED_NOT_TRACKING() {
    if (this.authService.auth.token) {
      return this.http.get(`${this.apiUrl}/api/protected-not-tracking-documents`).subscribe(res => {
        const data:any = res;
        this.documentProtectNotTracking = data.data ?? [];
        this.documentProtectNotTracking['groupByDate'] = this.dataFormatting.groupByDate(data.data.all);
        this.documentProtectNotTracking$.next(this.documentProtectNotTracking);
      });
    }

    return [];
  }

  delete(uuid:string) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/documentos/${uuid}`);
  }
  forceDelete(uuid:string) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/documentos-eliminados/${uuid}`);
  }
  restore(uuid:string) : Observable<any>{
    return this.http.post(`${this.apiUrl}/api/documentos-restaurar/${uuid}`, uuid)
      .pipe(tap(data => this.GET_ALL() ));

  }

  /** Draft */
  all() {
    return this.documentos$.asObservable()
  }
  allDeleted() {
    return this.documentosEliminados$.asObservable()
  }
  changeDraftDocumentToDeleted(document: Documento, group:string) {
    this.deleteDocumentItem(document, group);

    this.documentosEliminados[group].push(document);
    this.documentosEliminados[group].sort();
    this.documentosEliminados$.next(this.documentosEliminados);
  }
  changeDeletedDocumentToDraft(document: Documento, group:string) {
    this.deleteTrashItem(document, group);

    this.documentos[group].push(document);
    this.documentos[group].sort();
    console.log('documento cambiado', this.documentos)
    this.documentos$.next(this.documentos);
  }
  deleteDocumentItem(document: Documento, group:string) {
    this.documentos[group] = this.documentos[group].filter(item => item.uuid != document.uuid);
    this.documentos$.next(this.documentos);
  }
  deleteTrashItem(document: Documento, group:string) {
    this.documentosEliminados[group] = this.documentosEliminados[group]?.filter(item => item.uuid != document.uuid);
    this.documentosEliminados$.next(this.documentosEliminados);
  }
  

  /** Protected */
  allProtected(): Observable<Documento[]> {
    return this.documentosProtegidos$.asObservable();
  }
  allProtectedNotTracking(): Observable<Documento[]> {
    return this.documentProtectNotTracking$.asObservable();
  }
  changeProtectedNotTrackDocumentToProtect(document: Documento, group:string) {
    this.documentProtectNotTracking[group] = this.documentProtectNotTracking[group].filter(item => item.uuid != document.uuid);
    this.documentProtectNotTracking$.next(this.documentProtectNotTracking);

    this.documentosProtegidos[group].push(document);
    this.documentosProtegidos[group].sort();
    this.documentosProtegidos$.next(this.documentosProtegidos);
  }
  changeProtectDocumentToDoNotTrack(document: Documento, group:string) {
    this.documentosProtegidos[group] = this.documentosProtegidos[group].filter(item => item.uuid != document.uuid);
    this.documentosProtegidos$.next(this.documentosProtegidos);

    this.documentProtectNotTracking[group].push(document);
    this.documentProtectNotTracking[group].sort();
    this.documentProtectNotTracking$.next(this.documentProtectNotTracking);
  }

  initial() {
    this.documentos = [];
    this.documentos$.next(this.documentos);

    this.documentosEliminados = [];
    this.documentosEliminados$.next(this.documentosEliminados);
    
    this.documentosProtegidos = [];
    this.documentosProtegidos$.next(this.documentosProtegidos);

    this.documentProtectNotTracking = [];
    this.documentProtectNotTracking$.next(this.documentProtectNotTracking);
  }
}


export interface Documento {
  id: number;
  user_id: number;
  version: number;
  titulo: string;
  contenido: string;
  uuid: string;
  protegido: boolean;
  bloqueado: boolean;
  red: string;
  monitoring: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}