import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  @Input() element!: any;
  @Input() modo!: string;
  @Output() volver = new EventEmitter();

  distribuidoras = [];
  archivo: FileList;


  formProducto!: FormGroup;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getService.obtenerDistribuidoras().subscribe(res => {
      console.log(res)
      this.distribuidoras = res;
    });
    this.formProducto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      marca: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      distribuidora: new FormControl('', [Validators.maxLength(50)]),
      tipo: new FormControl('', [Validators.maxLength(20)]),
      aka: new FormControl('', [Validators.maxLength(30)]),
      url: new FormControl('', [Validators.maxLength(20)]),
      unidadAgrupacion: new FormControl('0', [Validators.maxLength(5)]),
      protocolo: new FormControl('', [Validators.maxLength(20)])
    });
    if (this.modo === 'EDITAR'){
      this.formProducto.patchValue({
        nombre: this.element.nombre,
        marca: this.element.marca,
        distribuidora: this.element.id_distribuidora,
        tipo: this.element.tipo,
        aka: this.element.aka,
        url: this.element.url,
        unidadAgrupacion: this.element.unidadAgrupacion,
        protocolo: this.element.protocolo
      });
    } 
  }

  crearProducto(): void{
    console.log(this.element);
    const producto : any = {
      nombre: this.formProducto.value.nombre,
      marca: this.formProducto.value.marca,
      id_distribuidora: this.formProducto.value.distribuidora,
      tipo: this.formProducto.value.tipo,
      aka: this.formProducto.value.aka,
      url: this.formProducto.value.url,
      unidadAgrupacion: this.formProducto.value.unidadAgrupacion,
      protocolo: this.formProducto.value.protocolo
    };
    if (this.modo === 'CREAR'){
      this.postService.crearProducto(producto).subscribe(res => {
        console.log(res);
        console.log(this.archivo[0]);
        this.postService.subirArchivo(this.archivo, res.id_producto).subscribe( res2 => {
          console.log(res2);
        });
      });
    } else {
      producto.id_producto = this.element.id_producto
      this.postService.editarProducto(producto).subscribe(res => {
        console.log(res);
      });
    }
  }

  onArchivoSeleccionado($event) {
    console.log($event.target.files)
    this.archivo = $event.target.files
  }


  

}
