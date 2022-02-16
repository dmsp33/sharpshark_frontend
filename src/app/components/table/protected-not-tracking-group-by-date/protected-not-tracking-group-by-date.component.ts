import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'protected-not-tracking-group-by-date',
  templateUrl: './protected-not-tracking-group-by-date.component.html',
  styleUrls: ['./protected-not-tracking-group-by-date.component.scss'],
  inputs: ['data', 'group'],
  outputs: ['changeStatus']
})
export class ProtectedNotTrackingGroupByDateComponent implements OnInit {
  data!: any;
  group!: string;
  changeStatus = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  changeStatusMonitoring(document:any, group:string) {
    this.changeStatus.emit({
      document: document, 
      group: group
    })
  }
}
