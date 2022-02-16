import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ModalSafeListComponent } from 'src/app/components/modal/safe-list/safe-list.component';
import { DocumentService } from 'src/app/shared/services/documentos/document.service';
import { ProtectedDocumentType } from './models/protected-document-type.enum';


declare var jQuery: any;

declare var $: any;

@Component({
  selector: 'app-protected-document',
  templateUrl: './protected-document.component.html',
  styleUrls: ['./protected-document.component.scss']
})
export class ProtectedDocumentComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  // @ViewChild(AlertDocumentComponent) alertD: AlertDocumentComponent;
  // @ViewChild(DisputeDocumentComponent) disputeD: DisputeDocumentComponent;
  // @ViewChild(DocumentAboutComponent) aboutD: DocumentAboutComponent;
  @ViewChild(ModalSafeListComponent) vsafelist!: ModalSafeListComponent;

  selectedType: ProtectedDocumentType = ProtectedDocumentType.Content;
  htmlContent = '';
  stopTracking = true;
  ShowBtn!: boolean;

  /**Nuevas variables */
  documento:any = {};

  readonly ProtectedDocumentType = ProtectedDocumentType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentService: DocumentService,
    // private authService: AuthService,
    // private proctService: ProtectedService,
    // private draftService: DraftService,
    // private sharedService: SharedService,
    // private translate: TranslateService,
    // public alertService: AlertService,
    // private alertDoc: AlertsService,
    // private storage: SessionStorageService,
  ) { }

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid')
    if(uuid) {
      this.blockUI.start('loading');

      this.documentService.getByUuid(uuid).subscribe(document => {
        this.documento = document.data;

        if (this.documento) this.htmlContent = this.documento?.titulo + " " + this.remplazarPorHtmlEntities(this.documento?.contenido);
        this.blockUI.stop();
      }, err => {this.blockUI.stop()});
    }

    (function ($) {
      $(document).ready(function () {
        $('.scroll-content-y').mCustomScrollbar({
          theme: "dark-3",
          axis: "y" // horizontal scrollbar
        });

      });
    })(jQuery);
  }

  selectType(type: ProtectedDocumentType): void {
    this.selectedType = type;
  }

  getDataDocumentProtected(id) {}

  remplazarPorHtmlEntities(texto: String) {
    return ("<p>" + texto.replace(/\r?\n|\r/g, "<br/>") + "</p>").toString()
  }

  showModalL() {
    this.vsafelist.showModal()
  }

  showPass() {
    $("#ShowProct").modal('show');
  }

  changeStatusMonitoring() {
    this.blockUI.start('Loading...');

    this.documento.monitoring = !this.documento.monitoring;
    this.documentService.update(this.documento).subscribe(res => {
      this.blockUI.stop();
    }, err => this.blockUI.stop() );
  }
}
