import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Certificado } from '../../../core/api';

@Component({
    selector: 'sh-certificate-header',
    templateUrl: './certificate-header.component.html',
    styleUrls: ['./certificate-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'certificate-header',
    },
})
export class CertificateHeaderComponent {
    @Input() certificate: Certificado;

    get urlIpfs(): string {
        return `https://ipfs.io/ipfs/${this.certificate?.ipfs}`;
    }

    constructor() {
    }
}
