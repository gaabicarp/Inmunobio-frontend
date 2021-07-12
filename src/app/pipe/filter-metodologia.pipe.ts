import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMetodologia'
})
export class FilterMetodologiaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    for (const post of value){
      if (post.metodologia.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPost.push(post)
      }
    }
    return resultPost;
  }

}
