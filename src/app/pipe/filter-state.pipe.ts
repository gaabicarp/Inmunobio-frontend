import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterState'
})
export class FilterStatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
