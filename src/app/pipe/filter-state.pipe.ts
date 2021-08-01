import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterState'
})
export class FilterStatePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    if (arg == -1){
      return value;
    }

    for (const post of value){
      if (post.finalizado === JSON.parse(arg)) {
        resultPost.push(post);
      }
    }
    return resultPost;
  }
}
