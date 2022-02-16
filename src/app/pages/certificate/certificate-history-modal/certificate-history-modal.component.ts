import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Certificado } from '../../../core/api';
import { DateFormats } from '../../../shared/constants/date-formats.constant';

@Component({
    selector: 'sh-certificate-history',
    templateUrl: './certificate-history-modal.component.html',
    styleUrls: ['./certificate-history-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateHistoryModalComponent implements AfterViewInit {
    @Input() certificateCurrentVersion: Certificado;
    @Input() certificateOtherVersions: Certificado[];
    @ViewChild('modal', { static: true }) modalElementRef: ElementRef;

    readonly DateFormats = DateFormats;

    private modalInstance: JQuery<HTMLElement> | undefined;

    ngAfterViewInit(): void {
        this.makeModal();
    }

    isNeverLocked(certificate: Certificado): boolean {
        if (certificate.id === this.certificateCurrentVersion.id) {
            return !this.certificateCurrentVersion.bloqueado && !this.certificateOtherVersions.some(c => c.bloqueado);
        }
        return !this.certificateOtherVersions.some(c => certificate.version >= c.version && c.bloqueado);
    }

    open(event: Event): void {
        event.preventDefault();
        this.modalInstance?.modal('show');
    }

    private makeModal(): void {
        this.modalInstance = $(this.modalElementRef.nativeElement).modal({
            show: false,
        });
    }
}
