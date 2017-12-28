import { Pipe } from '@angular/core';
import { Schedule } from '../../models/models';

@Pipe({
  name: "orderScheduleByDate"
})
export class ScheduleOrderByPipe {
  transform(schedules: Schedule[], args: string) {

    
    if (schedules != null) {
      return schedules.sort((a: Schedule, b: Schedule) => {

        let a_date = new Date(a.date + 'T' + a.fromtime + ':00');
        let b_date = new Date(b.date + 'T' + b.fromtime + ':00');

        if (a_date < b_date) {
          return -1;
        } else  {
          return 1;
        } 
      });
    } else {
      return schedules;
    }

  }
}