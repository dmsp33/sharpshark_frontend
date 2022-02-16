import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DraftService } from 'src/app/shared/services/documentos/draft.service';
import { DraftListDeleteComponent } from './delete/delete.component';
import { DraftListWorkingComponent } from './working/working.component';
import { DraftType } from '../draft/models/draft-type.enum';

declare var jQuery: any;

@Component({
    selector: 'app-draft-list',
    templateUrl: './draft-list.component.html',
    styleUrls: ['./draft-list.component.scss'],
})
export class DraftListComponent implements OnInit {
    @ViewChild(DraftListWorkingComponent) draftW!: DraftListWorkingComponent;
    @ViewChild(DraftListDeleteComponent) draftD!: DraftListDeleteComponent;

    selectedType: DraftType = DraftType.Working;

    active: boolean = false;
    totalRegistros = 0;

    readonly DraftType = DraftType;

    constructor(
        private draftService: DraftService,
        private authService: AuthService,
    ) {
        if (this.authService.check()) {
            this.draftService.all().subscribe(documentos => {
                const data: any = documentos;
                if (documentos) {
                    this.totalRegistros = data.groupByDate.today.length + data.groupByDate.week.length + data.groupByDate.month.length + data.groupByDate.even_earlier.length;
                }
            });
        }
    }

    ngOnInit(): void {
        (function ($) {
            $(document).ready(function () {
                // scrollList();
                $('.card-scroll').mCustomScrollbar({
                    theme: 'dark-3',
                    axis: 'y', // horizontal scrollbar
                    live: 'on',
                    liveSelector: 'card-scroll',
                });
            });
        })(jQuery);
    }

    ngOnChange() {
        this.draftW.getListWorking();
    }

    selectType(type: DraftType): void {
        this.selectedType = type;
    }

    callDeleteRegistros() {
        this.draftD.getListDraftDelete();
    }

    callListarRegistros() {
        this.draftW.getListWorking();
    }

    updateCountRow(total: number) {
        this.totalRegistros = total;
    }

    activeInfo() {
        this.active = !this.active;
    }
}
