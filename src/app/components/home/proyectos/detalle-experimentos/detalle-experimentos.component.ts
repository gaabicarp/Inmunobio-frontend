import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-detalle-experimentos',
  templateUrl: './detalle-experimentos.component.html',
  styleUrls: ['./detalle-experimentos.component.css']
})
export class DetalleExperimentosComponent implements OnInit {
  idProyecto!: number;
  idExperimento!: number;
  proyecto: any;
  experimento: any;

  constructor(private activatedRouter: ActivatedRoute, private getService: GetService) { }

  ngOnInit(): void {
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.getService.obtenerProyectosPorId(this.idProyecto).subscribe(res => {
      console.log(res);
      this.proyecto = res;
    });
    this.getService.obtenerExperimentoPorId(this.idExperimento).subscribe(res => {
      console.log(res);
      this.experimento = res;
    });

  }

}
