import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Producto } from 'src/app/models/producto.model'
import { DatePipe } from '@angular/common';
import { ProductoEdic, ProductoStock, Stock, StockEdicion } from 'src/app/models/stock.model';
import { Contenedor } from 'src/app/models/contenedores.model';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css'],
  providers: [DatePipe]
})

export class AgregarStockComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() element!: any;
  @Input() idProducto!: any;
  @Input() modo!: string;
  @Input() espacio!: number;
  @Output() volviendo = new EventEmitter<number>();

  productos: Producto;
  contenedores: Contenedor;
  nuevoStocks = [];
  lista = [];
  
  formStock!: FormGroup;
  step: number;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
 
  constructor(private getService: GetService, private postService: PostService, public datepipe: DatePipe) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.step = 2;
    this.alert = false;
    console.log(this.espacio)
    console.log(this.idProducto)
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
                            console.log(res)
                            this.productos = res; })
    );
    this.subscription.add( this.getService.obtenerContenedores().subscribe(res => {
                            console.log(res)
                            this.contenedores = res; })
    );
    this.formStock = new FormGroup({
      producto: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lote: new FormControl('', [Validators.maxLength(50)]),
      unidad: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      contenedor: new FormControl('', [Validators.maxLength(11)]),
      detalleUbicacion: new FormControl('', [Validators.maxLength(11)]),
      fechaVencimiento: new FormControl('', [Validators.maxLength(11)]),
    });
    if (this.modo === 'EDITAR'){
      console.log(this.element)
      this.formStock.patchValue({
        producto: this.element.id_producto,
        lote: this.element.producto[this.idProducto].lote,
        unidad: this.element.producto[this.idProducto].unidad,
        contenedor: this.element.producto[this.idProducto].codigoContenedor,
        detalleUbicacion: this.element.producto[this.idProducto].detalleUbicacion,
        fechaVencimiento: this.datepipe.transform(this.element.producto[this.idProducto].fechaVencimiento, 'yyyy-MM-dd')
      });
    }
  }

  productoEnStock(): void{
    var fecha = this.formStock.value.fechaVencimiento;
    const productoEnStock : ProductoStock = {
      lote: this.formStock.value.lote,
      unidad: this.formStock.value.unidad,
      codigoContenedor: this.formStock.value.contenedor,
      detalleUbicacion: this.formStock.value.detalleUbicacion,
      fechaVencimiento: this.datepipe.transform( fecha,'yyyy-MM-ddT23:01:10.288Z')
    }
    this.lista = [productoEnStock]
    this.AgregarStock(this.lista)
  }

  AgregarStock(productoEnStock): void{
    const stock : Stock = {
      id_grupoDeTrabajo : 1 ,
      id_espacioFisico : this.espacio ,
      id_producto: this.formStock.value.producto,
      producto: productoEnStock
    };
    this.nuevoStocks.push(stock) // esto es para que me aparezca la lista abajo
    if (this.modo === 'CREAR'){
      console.log(this.nuevoStocks)
      this.postService.agregarStock(stock).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'Producto en stock agregado correctamente';
          setTimeout(() => {
            this.volviendo.emit(1);
          }, 2000);
        }
        console.log(res);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } 
      else {
        const prod : ProductoEdic = {
          codigoContenedor: this.formStock.value.contenedor,
          detalleUbicacion : this.formStock.value.detalleUbicacion,
          unidad : 0,
          id_productos : this.element.producto[this.idProducto].id_productos
        }
        const edicion : StockEdicion = {
          id_productoEnStock: this.element.id_productoEnStock,
          producto: prod
        }
      this.postService.editarStock(edicion).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'Producto en stock agregado correctamente';
          setTimeout(() => {
            this.volviendo.emit(1);
          }, 2000);
        }
        console.log(res);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }
  volver(): void{
    this.volviendo.emit(1);
  }
}

