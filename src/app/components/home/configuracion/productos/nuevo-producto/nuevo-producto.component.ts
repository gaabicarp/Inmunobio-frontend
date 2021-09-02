import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto.model';
import { Distribuidora } from 'src/app/models/distribuidora.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  distribuidoras: Distribuidora;
  archivo: FileList;

  cargando: boolean;
  disabledForm: boolean;

  formProducto!: FormGroup;
  estado: string;
  idProducto: number;
  producto: any;
  modo: string;

  constructor(
    private getService: GetService,
    private postService: PostService,
    private activatedRouter: ActivatedRoute,
    public toastService: ToastServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR';


    this.getService.obtenerDistribuidoras().subscribe(res => {
      console.log(res);
      if (res){
        this.distribuidoras = res;
        this.cargando = false;
      } else {
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    });

    this.formProducto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      marca: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      distribuidora: new FormControl('-1', [Validators.maxLength(50)]),
      tipo: new FormControl('', [Validators.maxLength(50)]),
      aka: new FormControl('', [Validators.maxLength(100)]),
      url: new FormControl('', [Validators.maxLength(100)]),
      unidadAgrupacion: new FormControl('', [Validators.maxLength(10)]),
      protocolo: new FormControl('', [Validators.maxLength(200)])
    });

    if (this.modo === 'EDITAR'){
      this.idProducto = parseInt(this.activatedRouter.snapshot.paramMap.get('idProducto'), 10);
      this.getService.obtenerProductosPorId(this.idProducto).subscribe(res => {
        if (res){
          this.producto = res;
          this.formProducto.patchValue({
            nombre: this.producto.nombre,
            marca: this.producto.marca,
            distribuidora: this.producto.id_distribuidora,
            tipo: this.producto.tipo,
            aka: this.producto.aka,
            url: this.producto.url,
            unidadAgrupacion: this.producto.unidadAgrupacion,
            protocolo: this.producto.protocolo
          });
          this.cargando = false;
        } else {
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
      });
    } else {
      this.cargando = false;
    }
  }

  crearProducto(): void{
    this.disabledForm = true;
    const producto: Producto = {
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
        // console.log(res);
        // console.log(this.archivo[0]);
        this.postService.subirArchivo(this.archivo, res).subscribe( res2 => {
          // console.log(res2);
          this.toastService.show('Producto Creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
            this.router.navigateByUrl('home/configuracion/productos');
          }, 2000);
        });
      }, err => {
        this.toastService.show('Error al crear' + err, { classname: 'bg-danger text-light', delay: 2000 });
        this.disabledForm = false;
      });
    } else {
      producto.id_producto = this.producto.id_producto;
      this.postService.editarProducto(producto).subscribe(res => {
        console.log(res);
        if (res.Status === 'ok'){
          this.toastService.show('Producto Editado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
            this.router.navigateByUrl('home/configuracion/productos');
          }, 2000);
        }
      }, err => {
        this.toastService.show('Error al editar' + err, { classname: 'bg-danger text-light', delay: 2000 });
        this.disabledForm = false;
      });
    }
  }

  onArchivoSeleccionado($event): void {
    // console.log($event.target.files)
    this.archivo = $event.target.files;
  }

  volver(): void {
    this.router.navigateByUrl('home/configuracion/productos');
  }

}
