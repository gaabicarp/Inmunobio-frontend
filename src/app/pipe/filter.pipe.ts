import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    if(value != null){
      for (const post of value){
        if (post.nombre?.toLowerCase().indexOf(arg?.toLowerCase()) > -1 ||
            post.codigo?.toLowerCase().indexOf(arg?.toLowerCase()) > -1){
          resultPost.push(post)
        }
      }
    }
    return resultPost;
  }

}
