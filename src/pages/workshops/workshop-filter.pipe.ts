import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'workshopFilter'})
export class FilterWorkshops implements PipeTransform {
  transform(value: string): string {
    //Not using pipes to filter any more
    return value;
  }
}