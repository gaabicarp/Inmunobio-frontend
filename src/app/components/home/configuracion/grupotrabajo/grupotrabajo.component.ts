import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

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

  constructor(
    private getService: GetService, 
    private postService: PostService,
    public toastService: ToastServiceService) { }

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
    this.postService.eliminarGrupoTrabajo(grupo.id_grupoDeTrabajo).subscribe(res =>{
      if (res.Status){
        this.toastService.show('Grupo Eliminado', { classname: 'bg-danger text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
        }, 2000);
      }
      
    })
  }

  onVolver(e: number): void{
    this.step = e;
  }

}
