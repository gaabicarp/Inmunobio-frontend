import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consumir } from 'src/app/models/stock.model';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-consumir-stock',
  templateUrl: './consumir-stock.component.html',
  styleUrls: ['./consumir-stock.component.css']
})
export class ConsumirStockComponent implements OnInit {

  @Input() element!: any;
  @Input() idProducto!: any;
  @Input() espacio!: number;
  @Output() volviendo = new EventEmitter<number>();

  step: number;
  estado: string;
  mensajeAlert: string;
  alert: boolean;

  formConsumir! :FormGroup;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.step = 3;
    this.alert = false;
      this.formConsumir = new FormGroup({
        cantidad: new FormControl('', [Validators.required, Validators.maxLength(20)])
      });
  }
  consumir(){
    const consumir : Consumir ={
      unidad: this.formConsumir.value.cantidad,
      id_productoEnStock : this.element.id_productoEnStock,
      id_productos: this.element.producto[this.idProducto].id_productos
    }
    this.postService.consumirStock(consumir).subscribe(res =>{
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Stock consumido correctamente';
        setTimeout(() => {
          this.volviendo.emit(1);
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    });

  }
  
  volver(): void{
    this.volviendo.emit(1);
  }

}
