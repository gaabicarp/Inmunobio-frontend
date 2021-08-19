import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import { Contenedor } from 'src/app/models/contenedores.model';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.component.html',
  styleUrls: ['./contenedores.component.css']
})
export class ContenedoresComponent implements OnInit {
  contenedores: Contenedor;
  proyectos = [];
  espacios = [];

  cargando: boolean;

  constructor(
    private getService: GetService,
    private postService: PostService,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.getService.obtenerProyectos().subscribe(res => {
      // console.log(res)
      this.proyectos = res;
    });
    this.getService.obtenerEspaciosFisicos().subscribe(res =>{
      this.espacios = res;
    });
    this.getService.obtenerContenedores().subscribe(res => {
      // console.log(res)
      this.contenedores = res;
      this.cargando = false;
    });
  }

  eliminar(id: number): void {
    this.postService.eliminarContenedor(id).subscribe(res =>{
      if (res.Status === 'Ok'){
        this.toastService.show('Distribuidora Eliminada', { classname: 'bg-danger text-light', delay: 2000 });
      }
      // console.log(res);
    });
  }
}
