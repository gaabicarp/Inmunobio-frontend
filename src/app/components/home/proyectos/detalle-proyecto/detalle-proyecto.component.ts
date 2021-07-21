import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GetService } from 'src/app/services/get.service';
import { ActivatedRoute } from '@angular/router';

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
  model2: NgbDateStruct;
  proyecto: any;
  jefeProyecto: any;
  usuariosProyecto = [];
  idProyecto: number;
  active = 1;
  filterPostName: string;
  filterPostActive: number;

  constructor(
    private router: Router,
    private getService: GetService,
    private activatedRouter: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.filterPostActive = -1;
    this.filterPostName = '';
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.getService.obtenerProyectosPorId(this.idProyecto).subscribe(res => {
      console.log(res)
      this.proyecto = res;
      this.traerDirector(res.idDirectorProyecto);
      this.traerUsuarios(res.participantes);
    });
    this.getService.obtenerExperimentos(this.idProyecto).subscribe(res => {
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

  open(content): void {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

}
