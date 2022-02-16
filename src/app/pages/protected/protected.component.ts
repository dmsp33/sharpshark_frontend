import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DraftService } from 'src/app/shared/services/documentos/draft.service';
import { ProtectedType } from './models/protected-type.enum';

@Component({
    selector: 'app-protected',
    templateUrl: './protected.component.html',
    styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent implements OnInit {
    @BlockUI() blockUI!: NgBlockUI;

    selectedType: ProtectedType = ProtectedType.Tracking;

    active: boolean = false;

    totalRegistrosMonitored = 0;
    totalRegistrosNotMonitored = 0;

    readonly ProtectedType = ProtectedType;

    constructor(
        private draftService: DraftService,
    ) {
    }

    ngOnInit(): void {
        this.draftService.allProtected().subscribe(documentos => {
            const data: any = documentos;
            if (data) this.totalRegistrosMonitored = data.groupByDate.today.length + data.groupByDate.week.length + data.groupByDate.month.length + data.groupByDate.even_earlier.length;
        });
        this.draftService.allProtectedNotTracking().subscribe(documentos => {
            const data: any = documentos;
            if (data) this.totalRegistrosNotMonitored = data.groupByDate.today.length + data.groupByDate.week.length + data.groupByDate.month.length + data.groupByDate.even_earlier.length;
        });
    }

    activeInfo() {
        this.active = !this.active;
    }

    selectType(type: ProtectedType): void {
        this.selectedType = type;
    }
}
