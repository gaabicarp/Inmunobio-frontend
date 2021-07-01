import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { async } from 'rxjs/internal/scheduler/async';
import { __await } from 'tslib';
import { GetService } from './services/get.service';
import { PostService } from './services/post.service';

@Pipe({
  name: 'nombreEspacioF'
})

export class NombreEspacioFPipe implements PipeTransform {
  constructor(private getService: GetService,private postService: PostService) { }
  espacios=[];
  espacio: any;
  nombre: string;

   transform(id_espacio:number) {
    this.getService.obtenerEspaciosFisicos().subscribe(res => {
      this.espacios = res;
      console.log(this.espacios)
    })
    this.esperar()
    this.espacio = this.espacios.find(espacio => espacio.id_espacioFisico === id_espacio)
    this.esperar()
    
    this.nombre = this.espacio?.nombre
    console.log(this.nombre)

    return this.nombre
    
  }
  async esperar(){
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  }

}
