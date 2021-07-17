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
  cargando: boolean;
  filterPost: string;
  constructor(private getService: GetService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.cargando = true;
    this.filterPost = '';
    this.subscription.add( this.getService.obtenerEspaciosFisicos().subscribe(res => {
                            console.log(res)
                            this.espacios = res; })
    );
  }
  
}
