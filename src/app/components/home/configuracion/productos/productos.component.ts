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
  productos : Producto;
  distribuidoras : Distribuidora;

  estado: string;
  mensajeAlert: string;
  alert: boolean;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.alert = false;
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
                            console.log(res)
                            this.productos = res; })
    );
    this.subscription.add( this.getService.obtenerDistribuidoras().subscribe(res => {
                            console.log(res)
                            this.distribuidoras = res; })
    );
  }
  
 
  eliminar(producto : Producto){
    this.postService.eliminarProducto(producto.id_producto).subscribe(res =>{
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Producto eliminado correctamente';
        setTimeout(() => {
          this.ngOnInit()
        }, 2000);
      }
      console.log(res);
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    })
  }

}
