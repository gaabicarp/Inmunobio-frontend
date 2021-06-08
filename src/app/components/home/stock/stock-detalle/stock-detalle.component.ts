import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import {Producto} from '../../../../models/producto.model';
import {Stock} from '../../../../models/stock.model';

@Component({
  selector: 'app-stock-detalle',
  templateUrl: './stock-detalle.component.html',
  styleUrls: ['./stock-detalle.component.css']
})
export class StockDetalleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() element!: any;
  @Output() volviendo = new EventEmitter<number>();

  stocks: Stock;
  productos: Producto;
  contenedores = [];

  productoSeleccionado: any;
  step: number;
  modo: string;
  espacio: number
  
  id_espacio: number;
  
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 1;
    this.id_espacio = this.element ;
    console.log(this.id_espacio);
    this.subscription.add( this.getService.obtenerStock(this.id_espacio).subscribe(res => {
                            console.log(res)
                            this.stocks = res; })
    );
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
                            console.log(res);
                            this.productos = res ; })
    );
    this.subscription.add( this.getService.obtenerContenedores().subscribe(res => {
                            console.log(res);
                            this.contenedores = res ; })
    );
  }

  crear(){
    this.modo = 'CREAR';
    this.espacio = this.id_espacio;
    this.step = 2;
  }

  editar(stock: Stock): void {
    this.productoSeleccionado = stock;
    this.espacio = this.id_espacio;
    this.modo = 'EDITAR';
    this.step = 2;
  }

  eliminar(stock: Stock, id: number){
    const id_productoEnStock= stock.id_productoEnStock
    const id_productos = stock.producto[id].id_productos
    this.postService.eliminarStock(id_productoEnStock, id_productos).subscribe(res =>{
      console.log(res);
    })
  }

  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }

}
