import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Documento, DraftService } from 'src/app/shared/services/documentos/draft.service';

@Component({
  selector: 'app-draft-list-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DraftListDeleteComponent implements OnInit {
  @Output() listdataD = new EventEmitter<number>();
  @BlockUI() blockUI!: NgBlockUI;

  documentos:any = [];
  documentsToday: any = [];
  documentsWeek: any = [];
  documentsMonth: any = [];
  documentsEvenEarlier: any = [];

  constructor(
    private route: Router,
    private draftService: DraftService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getListDraftDelete();

  }

  getListDraftDelete() {
    this.blockUI.start('loading');
    if(this.authService.check())  {
      (async () => {
        this.draftService.GET_ALL_DELETED();
        this.draftService.allDeleted().subscribe(res => {
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

  forceDeleteDocument(documento: Documento, group: string) {
    this.blockUI.start('Processing...');

    this.draftService.forceDelete(documento.uuid).subscribe(data => {
        // console.log('eliminado forzadamente', data)
        this.blockUI.stop();
        // this.documentos = this.documentos?.filter(item => item.uuid != uuid);
      }, error => {
        console.log('error en eliminacion forzosa', error)
        this.blockUI.stop();
      });
    this.draftService.deleteTrashItem(documento, group);
  }

  restoreDocument(documento: Documento, group: string) {
    this.blockUI.start('Processing...');

    this.draftService.restore(documento.uuid).subscribe(data => {
        this.blockUI.stop();
        // this.documentos = this.documentos?.filter(item => item.uuid != documento.uuid);
      }, error => {
        console.log('error en eliminacion forzosa', error)
        this.blockUI.stop();
      });
    
    this.draftService.changeDeletedDocumentToDraft(documento, group);
  }

}
