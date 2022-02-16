import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataFormattingService {

  constructor() { }

  /** Agrupar data por rango de fechas*/
  groupByDate(data: any[], groupBy:string = '') {
    let today = data.filter(item => {
      return moment().isSame(moment(item.created_at), 'day') &&
          moment().isSame(moment(item.created_at), 'month') &&
          moment().isSame(moment(item.created_at), 'year');
    });
    let week = data.filter(item => {
      return !moment().isSame(moment(item.created_at), 'day') &&
          moment().isAfter(moment(item.created_at), 'day') &&
          moment().isSame(moment(item.created_at), 'month') &&
          moment().isSame(moment(item.created_at), 'year');
    });
    let month = data.filter(item => {
      return !moment().isSame(moment(item.created_at), 'day') &&
          moment().isAfter(moment(item.created_at), 'day') &&
          moment().isSame(moment(item.created_at), 'month') &&
          moment().isSame(moment(item.created_at), 'year');
    });
    let even_earlier = data.filter(item => {
      return !moment().isSame(moment(item.created_at), 'day') &&
            moment().isAfter(moment(item.created_at), 'day') &&
            moment().isAfter(moment(item.created_at), 'month') ;
    });
    if (groupBy) {
      today= this.groupDataBy(today, groupBy);
      week =  this.groupDataBy(week, groupBy);
      month= this.groupDataBy(month, groupBy);
      even_earlier= this.groupDataBy(even_earlier, groupBy);
    }

    return {
      today: today,
      week:  week,
      month: month,
      even_earlier: even_earlier, //this.groupDataBy(even_earlier, 'documento_id'),
    }
  }

  groupDataBy(data, group) {
    return _.values(_.groupBy(data, group));
  }
}
