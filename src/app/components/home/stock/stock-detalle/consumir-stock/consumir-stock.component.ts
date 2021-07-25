import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Consumir } from 'src/app/models/stock.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-consumir-stock',
  templateUrl: './consumir-stock.component.html',
  styleUrls: ['./consumir-stock.component.css']
})
export class ConsumirStockComponent implements OnInit {

  estado: string;
  mensajeAlert: string;
  mensajeAlertOK: string;
  alert: boolean;
  alertOK: boolean;

  formConsumir! :FormGroup;
  idEspacioFisico:number;
  idProd:number;
  idUbicacion:number;
  stocks:any;
  producto:any;
  prodEspecifico:any;
  idProdEnStock:number;

  constructor(private postService: PostService,private getService: GetService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.idProd = parseInt(this.activatedRouter.snapshot.paramMap.get('idProducto'), 10);
    this.idProdEnStock = parseInt(this.activatedRouter.snapshot.paramMap.get('idProductoEnStock'), 10);
    this.idUbicacion = parseInt(this.activatedRouter.snapshot.paramMap.get('idUbicacion'), 10);
    this.getService.obtenerStock(this.idEspacioFisico).subscribe(res =>{
      this.stocks = res;
      console.log(res)
    })
    setTimeout(() => {
      this.producto = this.stocks.find(stock => (stock.id_producto == this.idProd) && (stock.id_productoEnStock == this.idProdEnStock))
      console.log(this.producto)
      this.prodEspecifico = this.producto.producto[this.idUbicacion]
      console.log(this.prodEspecifico)
    }, 500);
  
    this.alert = false;
      this.formConsumir = new FormGroup({
        cantidad: new FormControl('', [Validators.required, Validators.maxLength(20)])
      });
  }
  consumir(){
    const consumir : Consumir ={
      unidad: this.formConsumir.value.cantidad,
      id_productoEnStock : this.producto.id_productoEnStock,
      id_productos: this.prodEspecifico.id_productos
    }
    this.postService.consumirStock(consumir).subscribe(res =>{
      if (res.Status === 'ok'){
        this.alertOK = true;
        this.estado = 'success';
        this.mensajeAlertOK = 'Stock consumido correctamente';
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = 'ERROR - La cantidad solicitada no se encuentra en stock';
    });

  }
  
}
