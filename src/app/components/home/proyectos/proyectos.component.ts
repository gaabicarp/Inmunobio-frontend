import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyectos.model';
import { GetService } from 'src/app/services/get.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];
  filterPost: string;
  cargando: boolean;

  constructor(
    private getService: GetService,
    public toastService: ToastServiceService) { }

  ngOnInit(): void {
    this.cargando = true;
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    this.filterPost = '';
    this.getService.obtenerProyectoPorUsuario(usuario.id).subscribe(res => {
      console.log(res);
      if (res){
        this.proyectos = res;
        this.cargando = false;
      } else {
        this.proyectos = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    });
  }
}
