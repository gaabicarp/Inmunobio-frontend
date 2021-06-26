import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Jaula } from 'src/app/models/jaula.model';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-bioterio',
  templateUrl: './bioterio.component.html',
  styleUrls: ['./bioterio.component.css']
})
export class BioterioComponent implements OnInit {
  @Output() volviendo = new EventEmitter<number>();
  jaulas: Jaula;
  espacios = [];
  step : number;
  id:number;
  modo: string;
  jaulaSeleccionada: Jaula;
  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerJaulas().subscribe(res => {
      console.log(res);
      this.jaulas = res;
    });
    this.getService.obtenerEspaciosFisicos().subscribe(res => {
      console.log(res);
      this.espacios = res;
    })
  }
  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }

  editar(jaula : Jaula): void {
    this.jaulaSeleccionada = jaula;
    this.modo = 'EDITAR';
    this.step = 1;
  }
  ver(id_jaula:number):void{
    this.id = id_jaula;
    this.step = 2;
  }
  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }
}