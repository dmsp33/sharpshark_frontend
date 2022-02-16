import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Documento, DraftService } from 'src/app/shared/services/documentos/draft.service';

@Component({
  selector: 'app-draft-list-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.scss']
})
export class DraftListWorkingComponent implements OnInit {
  @Output() totalRegistros = new EventEmitter<number>();
  @Output() listdata = new EventEmitter<number>();
  
  @BlockUI() blockUI!: NgBlockUI;

  documentos:any = [];
  documentsToday: any = [];
  documentsWeek: any = [];
  documentsMonth: any = [];
  documentsEvenEarlier: any = [];

  constructor( 
    private authService: AuthService,
    private draftService: DraftService,
  ) { }

  ngOnInit(): void {
    this.getListWorking();
  }

  // LISTAR 
  getListWorking() {

    this.blockUI.start('loading');

    if(this.authService.check())  {
      (async () => {
        this.draftService.GET_ALL();
        this.draftService.all().subscribe(res => {
          const data:any = res;
          this.documentos = data?.groupByDate;
          this.documentsToday = this.documentos.today;
          this.documentsWeek = this.documentos.week;
          this.documentsMonth = this.documentos.month;
          this.documentsEvenEarlier = this.documentos.even_earlier;
          this.blockUI.stop();
        }, err => {
          this.blockUI.stop();
        })
      })()
    } else {

      this.blockUI.stop();
    }
  }

  deleteDocument(documento:Documento, group:string) {
    this.blockUI.start('Processing...');

    this.draftService.delete(documento.uuid).subscribe(data => this.blockUI.stop(), 
      error => {
      console.log('error en eliminacion bb', error)
      this.blockUI.stop();
    });

    this.draftService.changeDraftDocumentToDeleted(documento, group);
  }
}
