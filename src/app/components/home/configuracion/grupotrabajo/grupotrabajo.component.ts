import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-grupotrabajo',
  templateUrl: './grupotrabajo.component.html',
  styleUrls: ['./grupotrabajo.component.css']
})
export class GrupotrabajoComponent implements OnInit {

  gruposTrabajo = [];

  grupoSeleccionado: any;
  step: number;
  modo: string;

  constructor(private getService: GetService, private postService: PostService) { }


  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerGrupos().subscribe(res => {
      console.log(res)
      this.gruposTrabajo = res;
    });
  }

  editar(grupo: any){
    this.grupoSeleccionado = grupo;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }

  eliminar(usuario: any){
    this.postService.eliminarUsuario(usuario.id);
  }

  onVolver(){
    this.step = 0;
  }

}
