import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import {Producto} from '../../../../models/producto.model';
import { Stock } from '../../../../models/stock.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlogsBuscados } from 'src/app/models/blogs.model';
import { Contenedor } from 'src/app/models/contenedores.model';

@Component({
  selector: 'app-stock-detalle',
  templateUrl: './stock-detalle.component.html',
  styleUrls: ['./stock-detalle.component.css'],
  providers: [DatePipe]
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
  fecDesde:any;
  fecHasta:any;
  step: number;
  modo: string;
  espacio: number
  blog: BlogsBuscados;
  
  formFecha! :FormGroup;
  
  constructor(private getService: GetService, private postService: PostService, public datepipe: DatePipe) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 1;
    console.log(this.element);
    this.subscription.add( this.getService.obtenerStock(this.element).subscribe(res => {
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
    this.formFecha = new FormGroup({
      fecDesde: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)])
    })
  }

  crear(){
    this.modo = 'CREAR';
    this.espacio = this.element;
    this.step = 2;
  }

  editar(stock: Stock, id:number): void {
    this.productoSeleccionado = stock;
    this.idProducto = id;
    this.espacio = this.element;
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

  consumir(stock: Stock, id: number){
    this.productoSeleccionado = stock;
    this.idProducto = id;
    this.espacio = this.element;
    this.step = 3;
  }

  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }

  irBlogs(){
    this.step = 4;
  }
  irStock(){
    this.step = 1;
  }
  Buscar(){
    this.fecDesde = new Date(this.formFecha.value.fecDesde);
    this.fecHasta = new Date(this.formFecha.value.fecHasta);
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    this.espacio = this.element;
    const blog : BlogsBuscados = {
      id_espacioFisico: this.element,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    this.blog = blog
    this.step = 5
  }

  cancelar():void{
    this.step = 1;
  }
  
}
