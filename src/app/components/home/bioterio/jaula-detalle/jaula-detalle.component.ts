import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-jaula-detalle',
  templateUrl: './jaula-detalle.component.html',
  styleUrls: ['./jaula-detalle.component.css']
})
export class JaulaDetalleComponent implements OnInit {
  idJaula!: number;
  animales = [];

  constructor(private getService: GetService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.getService.obtenerJaulasPorId(this.idJaula).subscribe(res => {
      console.log(res);
    })
    this.getService.obtenerAnimalesPorJaula(this.idJaula).subscribe(res => {
      console.log(res);
      this.animales = res;
    })
  }

}
