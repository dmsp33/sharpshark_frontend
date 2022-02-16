import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DisputeService } from 'src/app/shared/services/dispute.service';

@Component({
  selector: 'app-dispute-form-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() disputeData:any;
  @Output() ChangeContactType = new EventEmitter<string>();
  @BlockUI() blockUI!: NgBlockUI;

  copy:boolean = false;
  claim:string = "“Author’s rights” is a term frequently used in connection with laws about intellectual property. The term is considered as a direct translation of the French term droit d’auteur (also German Urheberrecht). “Author’s rights” is a term frequently used in connection with laws about intellectual property. The term is considered as a direct translation of the French term droit d’auteur (also German Urheberrecht). “Author’s rights” is a term frequently used in connection with laws about intellectual property. The term is considered as a direct translation of the French term droit d’auteur (also German Urheberrecht). “Author’s rights” is a term frequently used in connection with laws about intellectual property. The term is considered as a direct translation of the French term droit d’auteur (also German Urheberrecht). “Author’s rights” is a term frequently used in connection with laws about intellectual property. The term is considered as a direct translation of the French term droit d’auteur (also German Urheberrecht)";
  contactFormGroup = this.fb.group({
    contact_type: ['email', Validators.required],
    email: this.fb.array([ this.fb.control('', [Validators.required, Validators.email]) ]),
    // alerta_id: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _disputeService: DisputeService,
  ) { }

  ngOnInit(): void {
  }

  saveContactInfo() {
    this.blockUI.start('Loading...');

    const data = {
      id: this.disputeData.id,
      type: 'alert',
      ...this.contactFormGroup.value
    }
    Object.assign(this.disputeData, this.contactFormGroup.value);

    // console.log('Datos a enviar',data)
    this._disputeService.update(data).subscribe(res => {
      this.blockUI.stop();
      this._router.navigate(['/disputes'])
    }, err => {
      console.error('Error', err)
      this.blockUI.stop();
    })

  }

  get f() { return this.contactFormGroup.controls; }

  /** FormArray methods */
  get email() {
    return this.contactFormGroup.get('email') as FormArray;
  }
  addEmail() {
    this.email.push(this.fb.control('', [Validators.required, Validators.email]));
  }
  removeEmail(i) {
    this.email.removeAt(i)
  }


  /** */
  copied() {
    this.copy = true;

    setTimeout(() => {
      this.copy = false;
    }, 2000)
  }
}
