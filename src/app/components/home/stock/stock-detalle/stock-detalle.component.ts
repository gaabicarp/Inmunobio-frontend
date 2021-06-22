import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import {Producto} from '../../../../models/producto.model';
import { Stock } from '../../../../models/stock.model';

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
  contenedores= [];

  productoSeleccionado: any;
  idProducto:number;
  step: number;
  modo: string;
  espacio: number
  
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 1;
    console.log(this.element.id_espacioFisico);
    this.subscription.add( this.getService.obtenerStock(this.element.id_espacioFisico).subscribe(res => {
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
    this.espacio = this.element.id_espacioFisico;
    this.step = 2;
  }
  editar(stock: Stock, id:number): void {
    this.productoSeleccionado = stock;
    this.idProducto = id;
    this.espacio = this.element.id_espacioFisico;
    this.modo = 'EDITAR';
    this.step = 2;
  }
  eliminar(stock: Stock, id: number){
    const id_productoEnStock= stock.id_productoEnStock
    const id_productos = stock.producto[id].id_productos
    this.subscription.add( this.postService.eliminarStock(id_productoEnStock, id_productos).subscribe(res =>{
      console.log(res); })
    );
  }
  consumir(stock: Stock, id: number){
    this.productoSeleccionado = stock;
    this.idProducto = id;
    this.espacio = this.element.id_espacioFisico;
    this.step = 3;
  }
  irBlogs(){
    this.espacio = this.element.id_espacioFisico;
    this.step = 4;
  }
  irStock(){
    this.step = 1;
  }
  irHerramientas(){
    this.espacio = this.element.id_espacioFisico;
    this.step = 6;
  }
  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }
}
