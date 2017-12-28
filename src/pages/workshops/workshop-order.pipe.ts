import { Pipe } from '@angular/core';
import { Workshop } from '../../models/models';

@Pipe({
  name: "orderbyDate"
})
export class OrderByPipe {
  transform(workshops: Workshop[], args: string) {

    
    if (workshops != null) {
      return workshops.sort((a: Workshop, b: Workshop) => {

        // let a_date = new Date(a.date + ' ' + a.time);
        // let b_date = new Date(b.date + ' ' + b.time);
        let a_date = new Date(a.datetime.replace(' ', 'T'));
        let b_date = new Date(b.datetime.replace(' ', 'T'));

        if (a_date < b_date) {
          return -1;
        } else  {
          return 1;
        } 
      });
    } else {
      return workshops;
    }

  }
}