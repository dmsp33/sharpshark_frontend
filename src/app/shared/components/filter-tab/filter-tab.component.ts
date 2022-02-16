import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sh-filter-tab',
  templateUrl: './filter-tab.component.html',
  styleUrls: ['./filter-tab.component.scss']
})
export class FilterTabComponent<T = any> {
  @Input() value: T;
  @Input() active: boolean;

  @Output() selected: EventEmitter<T> = new EventEmitter<T>();
}
