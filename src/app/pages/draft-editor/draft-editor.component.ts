import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DraftProcess } from './core/draft-process';

@Component({
  selector: 'app-draft-editor',
  templateUrl: './draft-editor.component.html',
  styleUrls: ['./draft-editor.component.scss']
})
export class DraftEditorComponent extends DraftProcess implements OnInit{
  editorData:any= {
    title: '',
    content: ''
  };

  alertaProcesoMensaje!: String;
  blockUiColor!: string;
  msgSaved!:string;
  msgClass!:string;

  //process status
  accionando: boolean = false;
  permitirPublicarDraft: boolean = false;
  mostrarComprobadoOriginalidad: boolean = true;
  mostrarErrorDeProteccion: boolean = false;
  mostrarErrorDeDatos: boolean = false;
  mostrarMensajeExitoso: boolean = false;
  confirmarProtegerDocumento:boolean = false;

  //data
  plagios:any;
  document: any = {
    id: null,
    title: '',
    content: '',
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  /**
   * Guardado de data
   */
  saveDoc() {

  }
  protectedDoc() {
    console.log('here', this.protected)
  }

  syncEditorDataToDocument() {
    this.document.title = this.editorData.title;
    this.document.content = this.editorData.content;
  }
}
