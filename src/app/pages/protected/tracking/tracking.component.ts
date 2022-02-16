import { group } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DocumentService } from 'src/app/shared/services/documentos/document.service';
import { Documento, DraftService } from 'src/app/shared/services/documentos/draft.service';

@Component({
  selector: 'app-protected-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class ProtectedTrackingComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  blockUiColor: any;

  @Output() totalRegistrosTracking = new EventEmitter<number>();
  @Output() listDocumentNotTracking = new EventEmitter<number>();

  documentos:any = [];
  documentsToday: any = [];
  documentsWeek: any = [];
  documentsMonth: any = [];
  documentsEvenEarlier: any = [];

  constructor( 
    private draftService: DraftService,
    private documentService: DocumentService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getListProtected();
  }

  getListProtected() {
    this.blockUI.start('Processing...');
    if(this.authService.check())  {
      (async () => {
        this.draftService.GET_ALL_PROTECTED();
        this.draftService.allProtected().subscribe(res => {
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

  changeStatusMonitoring(data) {
    this.blockUI.start('Loading...');

    data.document.monitoring = false;
    this.documentService.update(data.document).subscribe(res => this.blockUI.stop() , err => this.blockUI.stop() );
    
    this.draftService.GET_ALL_PROTECTED_NOT_TRACKING();
    this.draftService.GET_ALL_PROTECTED();
    // this.draftService.changeProtectDocumentToDoNotTrack(documento, group);
  }
}
