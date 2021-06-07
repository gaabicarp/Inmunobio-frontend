import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Producto } from 'src/app/models/stock.model'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css'],
  providers: [DatePipe]
})

export class AgregarStockComponent implements OnInit {
  @Input() element!: any;
  @Input() modo!: string;
  @Output() volver = new EventEmitter();
  productos = [];
  contenedores = [];
  nuevoStock = [];
  lista = [];
  

  formStock!: FormGroup;
 
  constructor(private getService: GetService, private postService: PostService, public datepipe: DatePipe) { }
  
  ngOnInit(): void {
    
    this.getService.obtenerProductos().subscribe(res => {
      console.log(res)
      this.productos = res;
    });
    this.getService.obtenerContenedores().subscribe(res => {
      console.log(res)
      this.contenedores = res;
    });

    this.formStock = new FormGroup({
      producto: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lote: new FormControl('', [Validators.maxLength(50)]),
      unidad: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      contenedor: new FormControl('', [Validators.maxLength(11)]),
      detalleUbicacion: new FormControl('', [Validators.maxLength(11)]),
      fechaVencimiento: new FormControl('', [Validators.maxLength(11)]),
    });
    // if (this.modo === 'EDITAR'){
    //   this.formStock.patchValue({
    //     producto: this.element.id_producto,
    //     lote: this.element.lote,
    //     unidad: this.element.unidad,
    //     contenedor: this.element.codigoContenedor,
    //     detalleUbicacion: this.element.detalleUbicacion,
    //     fechaVencimiento: this.element.fechaVencimiento
    //   });
    // }
  }



  productoEnStock(): void{
    var fecha = this.formStock.value.fechaVencimiento;
    const prod : Producto = {
      lote: this.formStock.value.lote,
      unidad: this.formStock.value.unidad,
      codigoContenedor: this.formStock.value.contenedor,
      detalleUbicacion: this.formStock.value.detalleUbicacion,
      fechaVencimiento: this.datepipe.transform( fecha,'yyyy-MM-ddT23:01:10.288Z')
    }
    this.nuevoStock.push(prod) // esto es para que me aparezca la lista abajo
    this.lista = [prod]
    this.AgregarStock(this.lista)
  }

  AgregarStock(prod): void{
    console.log(this.element);
    const stock : any = {
      id_grupoDeTrabajo : 1 ,
      id_espacioFisico : 1,
      id_producto: this.formStock.value.producto,
      //id_producto :this.formStock.value.producto,
      producto: prod
    };
    if (this.modo === 'CREAR'){
      console.log(prod);
      console.log(stock);
      this.postService.agregarStock(stock).subscribe(res => {
        console.log(res);
      });
    } 
    //   else {
    //   // stock.id_grupoDeTrabajo = this.element.id_grupoDeTrabajo;
    //   // stock.id_espacioFisico = this.element.id_espacioFisico;
    //   stock.id_grupoDeTrabajo =1;
    //   stock.id_espacioFisico = 1;
    //   this.postService.editarStock(stock).subscribe(res => {
    //     console.log(res);
    //   });
    // }
  }
}

