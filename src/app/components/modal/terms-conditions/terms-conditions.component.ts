import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  @Input() step!: number;

  constructor() { }

  ngOnInit(): void {
  }

  showModal(): void {
    $("#modalTermsAndConditions").modal('show');
  }
}
