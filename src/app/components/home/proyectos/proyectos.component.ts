import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos = [];
  step: number;
  modo: string;
  proyectoSeleccionado: any;

  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerProyectos().subscribe(res => {
      console.log(res);
      this.proyectos = res;
    });
  }

  crearProyecto(): void {
    this.step = 1;
    this.modo = 'CREAR';
  }

  editarProyecto(proyecto: any): void {
    this.step = 1;
    this.modo = 'EDITAR';
    this.proyectoSeleccionado = proyecto;
  }
}
