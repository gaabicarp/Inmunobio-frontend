import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import { Subscription } from 'rxjs';
import { Distribuidora } from '../../../../models/distribuidora.model';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  productos : Producto[]=[];
  distribuidoras : Distribuidora;

  productoSeleccionado: Producto;
  step: number;
  modo: string;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 0;
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
                            console.log(res)
                            this.productos = res; })
    );
    this.subscription.add( this.getService.obtenerDistribuidoras().subscribe(res => {
                            console.log(res)
                            this.distribuidoras = res; })
    );
  }
  
  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }

  editar(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  eliminar(producto : Producto){
    this.postService.eliminarProducto(producto.id_producto).subscribe(res =>{
      console.log(res);
    })
  }

  onVolviendo(e: number): void{
    this.step = e;
  }

}
