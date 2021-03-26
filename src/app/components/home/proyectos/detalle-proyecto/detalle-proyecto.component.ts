import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
const EXPERIMENTOS: any[] = [
  {
    id: 1,
    nombre: 'Experimento 1',
    fechaInicio: '20/12/90',
    fuenteExperimental: 'Fuente 1',
    fechaFin: '20/12/90',
  },
  {
    id: 2,
    nombre: 'Experimento 2',
    fechaInicio: '20/12/90',
    fuenteExperimental: 'Fuente 2',
    fechaFin: '20/12/90',
  },
  {
    id: 3,
    nombre: 'Experimento 3',
    fechaInicio: '20/12/90',
    fuenteExperimental: 'Fuente 3',
    fechaFin: '20/12/90',
  },
  {
    id: 4,
    nombre: 'Experimento 3',
    fechaInicio: '20/12/90',
    fuenteExperimental: 'Fuente 3',
    fechaFin: '20/12/90',
  },
];

function search(text: string, pipe: PipeTransform): any[] {
  return EXPERIMENTOS.filter(experimento => {
    const term = text.toLowerCase();
    return experimento.nombre.toLowerCase().includes(term)
        || pipe.transform(experimento.fechaInicio).includes(term)
        || pipe.transform(experimento.fuenteExperimental).includes(term)
        || pipe.transform(experimento.fechaFin).includes(term);
  });
}

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css'],
  providers: [DecimalPipe]
})
export class DetalleProyectoComponent implements OnInit {

  experimentos: Observable<any[]>;
  filter = new FormControl('');
  model:NgbDateStruct;

  constructor(pipe: DecimalPipe, private router: Router) {
    this.experimentos = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  ngOnInit(): void {
  }

  irA(id: number): void {
    this.router.navigateByUrl(`experimento/${id}`);
  }

}
