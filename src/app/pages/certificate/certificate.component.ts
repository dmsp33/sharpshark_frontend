import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DocumentService } from 'src/app/shared/services/documentos/document.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SPLIT_PATTERN } from '../../shared/translate/directives/translate-part/translate-part.pipe';
import { Certificado, CertificadoService } from '../../core/api';
import { CertificateQuestions } from './certificate-questions/certificate-questions.model';

@Component({
    selector: 'app-certificate',
    templateUrl: './certificate.component.html',
    styleUrls: ['./certificate.component.scss'],
})
export class CertificateComponent implements OnInit, OnDestroy {
    id: string;
    certificateCurrentVersion: Certificado;
    certificateOtherVersions: Certificado[];

    @BlockUI() blockUI!: NgBlockUI;

    readonly questions$: Observable<CertificateQuestions[]>;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly documentService: DocumentService,
        private readonly translateService: TranslateService,
        private readonly certificateService: CertificadoService,
        private readonly renderer: Renderer2,
    ) {
        this.addClassToBody();
        this.questions$ = this.translateService.get('certificate.faq.questions').pipe(startWith([]), map(questions => {
            return questions.map((questionsItem: string) => {
                const [question, answer] = (questionsItem ?? '').split(SPLIT_PATTERN);
                return { question, answer };
            });
        }));
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params['uuid'];
            this.showReport(this.id);
        });
    }

    ngOnDestroy() {
        this.removeClassFromBody();
    }

    private showReport(id: string): void {
        this.blockUI.start();

        this.certificateService.certificadosUuidGet(id).subscribe(response => {
            this.certificateCurrentVersion = response.data![0];
            this.certificateOtherVersions = response.data!.slice(1)
            this.blockUI.stop();
        });
    }

    private addClassToBody(): void {
        this.renderer.addClass(document.body, 'body--certificate');
    }

    private removeClassFromBody(): void {
        this.renderer.removeClass(document.body, 'body--certificate');
    }
}
