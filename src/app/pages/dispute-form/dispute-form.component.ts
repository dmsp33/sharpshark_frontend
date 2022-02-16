import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispute-form',
  templateUrl: './dispute-form.component.html',
  styleUrls: ['./dispute-form.component.scss']
})
export class DisputeFormComponent implements OnInit {

  step:number = 1;
  dispute:any;
  showInfo:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  addEvidenceData($evidence) {
    if(this.dispute) {
      Object.assign(this.dispute, $evidence);
    }
  }
  changeContactType($event) {
    if (!$event) $event = 'email';
    this.dispute.contact_type = $event;
  }
}
