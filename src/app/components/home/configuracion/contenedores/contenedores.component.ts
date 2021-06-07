import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';

@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.component.html',
  styleUrls: ['./contenedores.component.css']
})
export class ContenedoresComponent implements OnInit {
  contenedores = [];
  proyectos = [];

  contenedorSeleccionado: any;
  step: number;
  modo: string;
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerContenedores().subscribe(res => {
      console.log(res)
      this.contenedores = res;
    });
    this.getService.obtenerProyectos().subscribe(res => {
      console.log(res)
      this.proyectos = res;
    });
  }

  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }

  editar(contenedor: any): void {
    this.contenedorSeleccionado = contenedor;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  // eliminar(distribuidora : any){
  //   this.postService.eliminarDistribuidora(distribuidora.id_distribuidora).subscribe(res =>{
  //     console.log(res);
  //   })
  // }

  volver(){
    this.step = 0;
  }

}
