import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFechavencimiento'
})

export class FilterFechavencimientoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    const hoy = new Date(Date.now());

    if(hoy.getMonth() == 10 || hoy.getMonth() == 11 || hoy.getMonth() == 12){
      var meses= new Date(hoy.getFullYear()+1,hoy.getMonth()+3,hoy.getDate())
    }else{
      var meses= new Date(hoy.getFullYear(),hoy.getMonth()+3,hoy.getDate())
    }
    console.log(hoy,meses)
    if (arg == -1 || arg == 0){
      return value;
    }
    console.log(value)
    if(arg == 1){
      for (const post of value){
        for (const i of post.producto){
          if(post.seguimiento == true ){
            console.log(i.fechaVencimiento)
            const fechavenc =  new Date(i.fechaVencimiento)
            console.log(fechavenc)
            if( fechavenc  < meses){
              resultPost.push(post);
            }}}}}

    if(arg == 2){
      for (const post of value){
        for (const i of post.producto){
          if(post.seguimiento == true ){
            console.log(i.fechaVencimiento)
            const fechavenc =  new Date(i.fechaVencimiento)
            console.log(fechavenc)
            if(hoy > fechavenc){
              resultPost.push(post);
            }}}}
    }
    console.log(resultPost)
    return resultPost;
  }

}
