import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from 'src/app/services/get.service';
import { Subscription } from 'rxjs';
import { EspacioFisico } from 'src/app/models/EspacioFisico.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  espacios: EspacioFisico[] = [];
  filterPost: string ;
  cargando:boolean;

  constructor( 
    private getService: GetService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.filterPost = '';
    this.subscription.add( this.getService.obtenerEspaciosFisicos().subscribe(res => {
      console.log(res)
      if (res){
        this.espacios = res;
        this.cargando = false;
      } else{
        this.espacios =[];
        this.cargando= false;
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
