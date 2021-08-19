import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import { Subscription } from 'rxjs';
import { Distribuidora } from '../../../../models/distribuidora.model';
import { Producto } from 'src/app/models/producto.model';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  productos: Producto[];
  productosTodos: Producto[];
  distribuidoras: Distribuidora;

  cargando: boolean;

  page: number;
  pageSize: number;
  collectionSize: number;

  constructor(
    private getService: GetService,
    private postService: PostService,
    public toastService: ToastServiceService,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cargando = true;
    this.page = 1;
    this.pageSize = 10;
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
                            console.log(res);
                            this.cargando = false;
                            this.productos = res;
                            this.productosTodos = res;
                            this.collectionSize = res.length;
                            this.refreshUsers();
                          })
    );
    this.subscription.add( this.getService.obtenerDistribuidoras().subscribe(res => {
                            console.log(res)
                            this.distribuidoras = res;
                          })
    );
  }

  eliminar(producto: Producto): void{
    this.postService.eliminarProducto(producto.id_producto).subscribe(res => {
      if (res.Status === 'ok'){
        this.toastService.show('Producto Eliminado', { classname: 'bg-warning text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
          }, 2000);
      }
      console.log(res);
    }, err => {
      this.toastService.show('Problema al eliminar producto', { classname: 'bg-danger text-light', delay: 2000 });
    });
  }

  refreshUsers(): void {
    this.productos = this.productosTodos
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
