import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import { Contenedor } from 'src/app/models/contenedores.model';

@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.component.html',
  styleUrls: ['./contenedores.component.css']
})
export class ContenedoresComponent implements OnInit {
  contenedores: Contenedor[]=[];
  proyectos = [];
  espacios = [];
  estado: string;
  mensajeAlert: string;
  alert: boolean;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.alert = false;
    this.getService.obtenerContenedores().subscribe(res => {
      console.log(res)
      this.contenedores = res;
    });
    this.getService.obtenerProyectos().subscribe(res => {
      console.log(res)
      this.proyectos = res;
    });
    this.getService.obtenerEspaciosFisicos().subscribe(res =>{
      this.espacios = res;
    })
  }

  eliminar(id : number){
    this.postService.eliminarContenedor(id).subscribe(res =>{
      if (res.Status === 'Ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Contenedor eliminado correctamente';
        setTimeout(() => {
          this.ngOnInit()
        }, 2000);
      }
      console.log(res);
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    })
  }
}
