import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';

@Component({
  selector: 'app-stock-detalle',
  templateUrl: './stock-detalle.component.html',
  styleUrls: ['./stock-detalle.component.css']
})
export class StockDetalleComponent implements OnInit {
  productosStock = [];
  productos = [];
  contenedores = [];
  grupos = [];

  productoSeleccionado: any;
  step: number;
  modo: string;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerStock().subscribe(res => {
      console.log(res)
      this.productosStock = res;
    });
    this.getService.obtenerProductos().subscribe(res => {
      console.log(res);
      this.productos = res ;
    });
    this.getService.obtenerContenedores().subscribe(res => {
      console.log(res);
      this.contenedores = res ;
    });
    this.getService.obtenerGrupos().subscribe(res => {
      console.log(res);
      this.grupos = res ;
    });
  }

  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }

  editar(stock: any): void {
    this.productoSeleccionado = stock;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  eliminar(stock : any, id_productoEnStock : number){
    this.postService.eliminarStock(id_productoEnStock, stock.id_producto).subscribe(res =>{
      console.log(res);
    })
  }

}
