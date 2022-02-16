import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DocumentService } from 'src/app/shared/services/documentos/document.service';
import { Documento, DraftService } from 'src/app/shared/services/documentos/draft.service';

@Component({
  selector: 'app-protected-notracking',
  templateUrl: './notracking.component.html',
  styleUrls: ['./notracking.component.scss']
})
export class ProtectedNotrackingComponent implements OnInit {
  @Output() totalRegistrosNotTracking = new EventEmitter<number>();
  @Output() listDocumentTracking = new EventEmitter<number>();
  @BlockUI() blockUI!: NgBlockUI;

  /** Nuevas variables */
  documentos:any = [];
  documentsToday: any = [];
  documentsWeek: any = [];
  documentsMonth: any = [];
  documentsEvenEarlier: any = [];

  constructor(
    private authService: AuthService,
    private draftService: DraftService,
    private documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    this.getListProtectedNotTracking();
  }

  getListProtectedNotTracking() {
    this.blockUI.start('Processing...');
    
    if(this.authService.check())  {
      (async () => {
        this.draftService.GET_ALL_PROTECTED_NOT_TRACKING();
        this.draftService.allProtectedNotTracking().subscribe(res => {
          const data:any = res;
          console.log('data obtenida', data)
          this.documentos = data?.groupByDate;
          this.documentsToday = this.documentos.today;
          this.documentsWeek = this.documentos.week;
          this.documentsMonth = this.documentos.month;
          this.documentsEvenEarlier = this.documentos.even_earlier;
          
          this.blockUI.stop();
        }, err => this.blockUI.stop() );
      })()
    } else {
      this.blockUI.stop();
    }
  }

  changeStatusMonitoring(data) {
    this.blockUI.start('Loading...');

    data.document.monitoring = true;
    this.documentService.update(data.document).subscribe(res => this.blockUI.stop() , err => this.blockUI.stop() );
  
    this.draftService.GET_ALL_PROTECTED();
    this.draftService.GET_ALL_PROTECTED_NOT_TRACKING();
    // this.draftService.changeProtectedNotTrackDocumentToProtect(data.document, group);
  }
}
