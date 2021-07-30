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

  constructor( 
    private getService: GetService
  ) { }

  ngOnInit(): void {
    this.filterPost = '';
    this.subscription.add( this.getService.obtenerEspaciosFisicos().subscribe(res => {
      console.log(res)
      this.espacios = res;
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
