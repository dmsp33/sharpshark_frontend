import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CertificateQuestions } from './certificate-questions.model';

@Component({
    selector: 'sh-certificate-questions',
    templateUrl: './certificate-questions.component.html',
    styleUrls: ['./certificate-questions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'certificate-questions',
    },
})
export class CertificateQuestionsComponent {
    @Input() questions: CertificateQuestions[];
}
