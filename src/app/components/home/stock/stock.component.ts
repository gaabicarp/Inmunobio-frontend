import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from 'src/app/services/get.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  espacios = [];

  espacioSeleccionado: any;
  step: number;
  seleccionado : number

  constructor(private getService: GetService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.step = 0;
    this.subscription.add( this.getService.obtenerEspaciosFisicos().subscribe(res => {
                            console.log(res)
                            this.espacios = res; })
    );
  }
  ver(espacio: any){
    this.espacioSeleccionado = espacio;
    this.step = 1;
  }
  
  onVolviendo(e: number): void{
    this.step = e;
  }
  
}
