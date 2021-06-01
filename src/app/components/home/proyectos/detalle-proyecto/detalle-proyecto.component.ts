import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css'],
  providers: [DecimalPipe]
})
export class DetalleProyectoComponent implements OnInit {

  experimentos = [];
  experimentoFiltro = [];
  filter = new FormControl('');
  model: NgbDateStruct;
  proyecto: any;
  jefeProyecto: any;
  usuariosProyecto = [];

  constructor(private router: Router, private getService: GetService) {}

  ngOnInit(): void {
    this.getService.obtenerProyectosPorId(1).subscribe(res => {
      this.proyecto = res;
      this.traerDirector(res.idDirectorProyecto);
      this.traerUsuarios(res.participantes);
    });
    this.getService.obtenerExperimentos(1).subscribe(res => {
      console.log(res);
      this.experimentos = res;
      this.experimentoFiltro = res;
    });
  }

  traerDirector(id: number): void {
    this.getService.obtenerUsuariosPorId(id).subscribe(res => {
      this.jefeProyecto = res;
    });
  }

  traerUsuarios(usuarios: Array<number>): void {
    this.proyecto.participantes.map(id => {
      this.getService.obtenerUsuariosPorId(id).subscribe(res => {
        this.usuariosProyecto.push(res);
      });
    });
  }

  irA(id: number): void {
    this.router.navigateByUrl(`experimento/${id}`);
  }

  onFilter(filter: string): void {
    this.experimentoFiltro = this.experimentos.filter(res => {
      return res.objetivos === filter;
    });
  }

}
