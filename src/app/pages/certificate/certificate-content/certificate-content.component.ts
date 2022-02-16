import { Component, Input } from '@angular/core';
import { Certificado } from '../../../core/api';

@Component({
    selector: 'sh-certificate-content',
    templateUrl: './certificate-content.component.html',
    styleUrls: ['./certificate-content.component.scss'],
})
export class CertificateContentComponent {
    @Input() certificate: Certificado;
}
