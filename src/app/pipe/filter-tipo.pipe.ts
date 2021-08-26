import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTipo'
})
export class FilterTipoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    if (arg == -1){
      return value;
    }

    for (const post of value){
      if (post.tipo === arg) {
        resultPost.push(post);
      }
    }
    return resultPost;
  }

}
