import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Producto } from 'src/app/models/producto.model'
import { DatePipe } from '@angular/common';
import { ProductoEdic, ProductoStock, Stock, StockEdicion } from 'src/app/models/stock.model';
import { Contenedor } from 'src/app/models/contenedores.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css'],
  providers: [DatePipe]
})

export class AgregarStockComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  productos: Producto[];
  contenedores: Contenedor;
  
  formStock!: FormGroup;
  step: number;
  estado: string;
  mensajeAlert: string;
  alert: boolean;

  idEspacioFisico:number;
  idProd:number;
  idProdEnStock:number;
  idUbicacion:number;
  stocks:any;
  producto:any;
  prodEspecifico:any;
  editar = false;
 
  constructor(private getService: GetService, private postService: PostService, public datepipe: DatePipe, private activatedRouter: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.step = 2;
    this.alert = false;

    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.idProd = parseInt(this.activatedRouter.snapshot.paramMap.get('idProducto'), 10);
    this.idProdEnStock = parseInt(this.activatedRouter.snapshot.paramMap.get('idProductoEnStock'), 10);
    this.idUbicacion = parseInt(this.activatedRouter.snapshot.paramMap.get('idUbicacion'), 10);
    console.log(this.idProd)
    console.log(this.idUbicacion)
    if (!isNaN(this.idProd)){
      this.getService.obtenerStock(this.idEspacioFisico).subscribe(res =>{
        this.stocks = res;
        console.log(res)
      })
      this.editar = true;
      setTimeout(() => {
        this.producto = this.stocks.find(stock => (stock.id_producto = this.idProd) && (stock.id_productoEnStock == this.idProdEnStock))
        console.log(this.producto)

        this.prodEspecifico = this.producto.producto[this.idUbicacion]
        console.log(this.prodEspecifico)
      }, 500);
    }
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
                            console.log(res)
                            this.productos = res; })
    );
    this.subscription.add( this.getService.obtenerContenedores().subscribe(res => {
                            console.log(res)
                            this.contenedores = res; })
    );
    this.formStock = new FormGroup({
      producto: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      lote: new FormControl('', [Validators.maxLength(50)]),
      unidad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      contenedor: new FormControl('', [Validators.maxLength(30)]),
      detalleUbicacion: new FormControl('', [Validators.maxLength(50)]),
      fechaVencimiento: new FormControl('', [Validators.maxLength(11)]),
    });
    setTimeout(() => {
      if (!isNaN(this.idProd)){
        this.formStock.patchValue({
          producto: this.producto.id_producto,
          lote: this.prodEspecifico.lote,
          unidad: this.prodEspecifico.unidad,
          contenedor: this.prodEspecifico.codigoContenedor,
          detalleUbicacion: this.prodEspecifico.detalleUbicacion,
          fechaVencimiento: this.datepipe.transform(this.prodEspecifico.fechaVencimiento, 'yyyy-MM-dd')
        });
      }
    },500);
    
  }
  agregarStock(): void{
    var fecha = this.formStock.value.fechaVencimiento;
    const productoEnStock : any = {
      lote: this.formStock.value.lote,
      unidad: this.formStock.value.unidad,
      codigoContenedor: this.formStock.value.contenedor,
      detalleUbicacion: this.formStock.value.detalleUbicacion,
      fechaVencimiento: this.datepipe.transform( fecha,'yyyy-MM-ddT23:01:10.288Z')
    }
    const stock : Stock = {
      id_grupoDeTrabajo : 1 ,
      id_espacioFisico : this.idEspacioFisico ,
      id_producto: this.formStock.value.producto,
      producto: productoEnStock
    };
    console.log(stock)
    if (!isNaN(this.idProd)){
      const prod : ProductoEdic = {
        codigoContenedor: this.formStock.value.contenedor,
        detalleUbicacion : this.formStock.value.detalleUbicacion,
        unidad : 0,
        id_productos : this.prodEspecifico.id_productos
      }
      const edicion : StockEdicion = {
        id_productoEnStock: this.producto.id_productoEnStock,
        producto: prod
      }
    this.postService.editarStock(edicion).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Información editada correctamente';
      }
      console.log(res);
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    });
    } else {
        this.postService.agregarStock(stock).subscribe(res => {
          if (res.Status === 'ok'){
            this.alert = true;
            this.estado = 'success';
            this.mensajeAlert = 'Producto en stock agregado correctamente';
          }
          console.log(res);
        }, err => {
          this.alert = true;
          this.estado = 'danger';
          this.mensajeAlert = JSON.stringify(err.error.error);
          console.log(err)
        });
    }
  }
  
}

