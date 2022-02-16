import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DisputeService } from 'src/app/shared/services/dispute.service';

@Component({
  selector: 'app-dispute-form-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.scss']
})
export class EvidenceComponent implements OnInit {

  @Output() disputeData = new EventEmitter<any>();
  @Output() changeStep = new EventEmitter<number>();
  @BlockUI() blockUI!: NgBlockUI;

  evidenceFormGroup = this.fb.group({
    claim_for: [null, Validators.required],
    jurisdiction: [null, Validators.required],
    discovered: [null, Validators.required],
    screenshot: ['', Validators.nullValidator],
    remove_content: [1, Validators.required],
    acknowledge: [0, Validators.required],
    pay_for_use: [0, Validators.required],
    amount: ["0", Validators.nullValidator],
    money_type: ['USD', Validators.required],
    conditions_default: [0, Validators.required],
    certificate_authorship: [null, Validators.required],
    screenshot_draft: ['', Validators.nullValidator],
    in_question: this.fb.array([ this.fb.control('') ]),
    in_question_web_archive: this.fb.array([ this.fb.control('') ]),
    your_publication: this.fb.array([ this.fb.control('') ]),
    your_web_archive: this.fb.array([ this.fb.control('') ]),
    alerta_id:[null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _disputeService: DisputeService,
  ) { }

  ngOnInit(): void {
    const alertId = this._route.snapshot.paramMap.get('alert_id');
    const documentId = this._route.snapshot.paramMap.get('document_id');

    this._disputeService.getDisputeFormData(alertId, documentId).subscribe(data => {

      this.evidenceFormGroup.patchValue({
        alerta_id: alertId,
        claim_for: data.url,
        jurisdiction: data.countryName,
        discovered: data.timestamps,
      })

      this.disabledRemoveOrPay();
      this.disputeData.emit({
        alerta_id: alertId,
        id: data.dispute_id,
      })
    })
  }

  onSubmit() {
    this.blockUI.start('Loading...');

    this._disputeService.createDispute(this.evidenceFormGroup.value)
      .subscribe(data => {

        // console.log('crear disputa', data);

        this.disputeData.emit(data.data);
        this.changeStep.emit(2);

      }, error => {
        console.error('Error crear disputa', error)
        this.blockUI.stop()
      }, () => { this.blockUI.stop() });
    
  }

  get f() { return this.evidenceFormGroup.controls; }

  /** FormArray methods */
  get in_question() {
    return this.evidenceFormGroup.get('in_question') as FormArray;
  }
  addInQuestion() {
    this.in_question.push(this.fb.control(''));
  }
  removeInQuestion(i) {
    this.in_question.removeAt(i)
  }

  get in_question_web_archive() : FormArray {
    return this.evidenceFormGroup.get('in_question_web_archive') as FormArray;
  }
  addInQuestionWebArchive() {
    this.in_question_web_archive.push(this.fb.control(''));
  }
  removeInQuestionWebArchive(i) {
    this.in_question_web_archive.removeAt(i)
  }
  
  get your_publication() : FormArray {
    return this.evidenceFormGroup.get('your_publication') as FormArray;
  }
  addYourPublication() {
    this.your_publication.push(this.fb.control(''));
  }
  removeYourPublication(i) {
    this.your_publication.removeAt(i)
  }
  
  get your_web_archive() : FormArray {
    return this.evidenceFormGroup.get('your_web_archive') as FormArray;
  }
  addYourWebArchive() {
    this.your_web_archive.push(this.fb.control(''));
  }
  removeYourWebArchive(i) {
    this.your_web_archive.removeAt(i)
  }

  disabledRemoveOrPay() {
    // alert(this.evidenceFormGroup.get('remove_content')?.value)
    if(this.evidenceFormGroup.get('remove_content')?.value || this.evidenceFormGroup.get('conditions_default')?.value) {
      this.evidenceFormGroup.controls['acknowledge'].disable()
      this.evidenceFormGroup.controls['pay_for_use'].disable()
      this.evidenceFormGroup.controls['amount'].disable()
      this.evidenceFormGroup.controls['money_type'].disable()
    } else {
      this.evidenceFormGroup.controls['acknowledge'].enable()
      this.evidenceFormGroup.controls['pay_for_use'].enable()
      this.evidenceFormGroup.controls['amount'].enable()
      this.evidenceFormGroup.controls['money_type'].enable()
    }
  }

  onFileInputScreenshot(event) {
    if (event.target.files.length > 0) {
      const files:FileList = event.target.files;
      const file = files.item(0);

      // this.evidenceFormGroup.patchValue({
      //   screenshot: file
      // });
    }
  }

  onFileInputScreenshotDraft(event) {
    if (event.target.files.length > 0) {
      const files:FileList = event.target.files;
      const file = files.item(0);

      // this.evidenceFormGroup.patchValue({
      //   screenshot_draft: file
      // });
    }
  }

}
