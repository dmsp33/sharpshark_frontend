import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dispute-form-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {
  @Output() changeStep = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
