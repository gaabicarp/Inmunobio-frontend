import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto.model';
import { Distribuidora } from 'src/app/models/distribuidora.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  
  distribuidoras: Distribuidora;
  archivo: FileList;

  formProducto!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  idProducto:number;
  producto:any;

  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.alert = false;
    this.idProducto = parseInt(this.activatedRouter.snapshot.paramMap.get('idProducto'), 10);
    if (!isNaN(this.idProducto)){
      this.getService.obtenerProductosPorId(this.idProducto).subscribe(res => {
        this.producto=res;
      })
      }
    this.getService.obtenerDistribuidoras().subscribe(res => {
      console.log(res)
      this.distribuidoras = res;
    });

    this.formProducto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      marca: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      distribuidora: new FormControl('', [Validators.maxLength(50)]),
      tipo: new FormControl('', [Validators.maxLength(50)]),
      aka: new FormControl('', [Validators.maxLength(100)]),
      url: new FormControl('', [Validators.maxLength(100)]),
      unidadAgrupacion: new FormControl('0', [Validators.maxLength(10)]),
      protocolo: new FormControl('', [Validators.maxLength(200)])
    });
    setTimeout(() => {
      if (!isNaN(this.idProducto)){
        this.formProducto.patchValue({
          nombre: this.producto.nombre,
          marca:this.producto.marca,
          distribuidora: this.producto.id_distribuidora,
          tipo: this.producto.tipo,
          aka: this.producto.aka,
          url: this.producto.url,
          unidadAgrupacion: this.producto.unidadAgrupacion,
          protocolo: this.producto.protocolo
        });
      }
    }, 500);
     
  }

  crearProducto(): void{
    const producto : Producto = {
      nombre: this.formProducto.value.nombre,
      marca: this.formProducto.value.marca,
      id_distribuidora: this.formProducto.value.distribuidora,
      tipo: this.formProducto.value.tipo,
      aka: this.formProducto.value.aka,
      url: this.formProducto.value.url,
      unidadAgrupacion: this.formProducto.value.unidadAgrupacion,
      protocolo: this.formProducto.value.protocolo
    };
    if (isNaN(this.idProducto)){
      this.postService.crearProducto(producto).subscribe(res => {
        console.log(res);
        console.log(this.archivo[0]);
        this.postService.subirArchivo(this.archivo, res).subscribe( res2 => {
          console.log(res2);
        });
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El producto fue creado correctamente';

      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      producto.id_producto = this.producto.id_producto
      this.postService.editarProducto(producto).subscribe(res => {
        console.log(res);
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'La información fue editada correctamente';
        }
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }

  onArchivoSeleccionado($event) {
    console.log($event.target.files)
    this.archivo = $event.target.files
  }

}
