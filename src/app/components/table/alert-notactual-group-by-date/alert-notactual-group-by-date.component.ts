import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'alert-notactual-group-by-date',
  templateUrl: './alert-notactual-group-by-date.component.html',
  styleUrls: ['./alert-notactual-group-by-date.component.scss'],
  inputs: ['data', 'group'],
  outputs: ['changeStatus']
})
export class AlertNotactualGroupByDateComponent implements OnInit {
  data!: any;
  group!: string;
  changeStatus = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changeActualStatus(document:any, group:string) {
    
    this.changeStatus.emit({
      document: document, 
      group: group
    })
  }
}
