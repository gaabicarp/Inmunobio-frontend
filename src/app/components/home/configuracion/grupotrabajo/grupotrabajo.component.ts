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
  cargando: boolean;

  constructor(private getService: GetService, private postService: PostService) { }


  ngOnInit(): void {
    this.cargando = true;
    this.getService.obtenerGrupos().subscribe(res => {
      console.log(res);
      this.cargando = false;
      this.gruposTrabajo = res;
    });
  }

  editarGrupo(grupo: any): void{
    this.grupoSeleccionado = grupo;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  crearGrupo(): void{
    this.modo = 'CREAR';
    this.step = 1;
  }

  eliminarGrupo(grupo: any): void{
    this.postService.eliminarGrupoTrabajo(grupo.id_grupoDeTrabajo);
  }

  onVolver(e: number): void{
    this.step = e;
  }

}
