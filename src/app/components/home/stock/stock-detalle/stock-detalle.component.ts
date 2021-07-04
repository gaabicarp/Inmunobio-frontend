import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import {Producto} from '../../../../models/producto.model';
import { Stock } from '../../../../models/stock.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsBuscados } from 'src/app/models/blogs.model';
import { Herramienta } from 'src/app/models/herramientas.model';

@Component({
  selector: 'app-stock-detalle',
  templateUrl: './stock-detalle.component.html',
  styleUrls: ['./stock-detalle.component.css']
})
export class StockDetalleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Output() volviendo = new EventEmitter<number>();

  stocks: Stock;
  productos: Producto;
  contenedores= [];
  idEspacioFisico:number;
  espacioFisico:any;

  productoSeleccionado: any;
  idProducto:number;
  step: number;
  modo: string;
  espacio: number

  fecDesde:any;
  fecHastaReal:any;
  fecHasta:any;
  fecHoy=new Date(Date.now());
  blogs = [];
  formFecha!: FormGroup;

  herramientas= [];
  herramientasFiltradas=[];
  
  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 1;
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    console.log(this.idEspacioFisico);
    //STOCK
    this.subscription.add( this.getService.obtenerStock(this.idEspacioFisico).subscribe(res => {
                            console.log(res)
                            this.stocks = res; })
    );
    this.subscription.add( this.getService.obtenerEspacioFisico(this.idEspacioFisico).subscribe(res => {
      console.log(res)
      this.espacioFisico = res; })
    );
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
                            console.log(res);
                            this.productos = res ; })
    );
    this.subscription.add( this.getService.obtenerContenedores().subscribe(res => {
                            console.log(res);
                            this.contenedores = res ; })
    );
    //BLOGS 
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogsBuscados = {
          id_espacioFisico: this.idEspacioFisico,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    console.log(blog)
    this.subscription.add(this.postService.obtenerBlogEspacioFisico(blog).subscribe(res =>{
      console.log(res);
      this.blogs = res; })
    );
    this.formFecha = new FormGroup({
      fecDesde: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)])
    })
    //HERRAMIENTAS 
    this.subscription.add( this.getService.obtenerHerramientas().subscribe(res => {
      console.log(res)
      this.herramientas = res; })
    );
   setTimeout(() => {
      const id = this.idEspacioFisico
      this.herramientasFiltradas =  this.herramientas.filter(function(herramienta) {
        return herramienta.id_espacioFisico == id;
      });
      console.log(this.herramientasFiltradas)
    }, 500);


  }
  Buscar(){
    this.fecDesde = new Date(this.formFecha.value.fecDesde);
    this.fecHastaReal= new Date(this.formFecha.value.fecHasta);
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogsBuscados = {
      id_espacioFisico: this.idEspacioFisico,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    this.subscription.add(this.postService.obtenerBlogEspacioFisico(blog).subscribe(res =>{
      console.log(res);
      this.blogs = res; })
    );
    
  }

  crear(){
    this.modo = 'CREAR';
    this.espacio = this.idEspacioFisico;
    this.step = 2;
  }
  editar(stock: Stock, id:number): void {
    this.productoSeleccionado = stock;
    this.idProducto = id;
    this.espacio = this.idEspacioFisico;
    this.modo = 'EDITAR';
    this.step = 2;
  }
  eliminar(stock: Stock, id: number){
    const id_productoEnStock= stock.id_productoEnStock
    const id_productos = stock.producto[id].id_productos
    this.subscription.add( this.postService.eliminarStock(id_productoEnStock, id_productos).subscribe(res =>{
      console.log(res); })
    );
  }
  consumir(stock: Stock, id: number){
    this.productoSeleccionado = stock;
    this.idProducto = id;
    this.espacio = this.idEspacioFisico;
    this.step = 3;
  }
  eliminarHerramienta(idHerr : number){
    this.postService.eliminarHerramienta(idHerr).subscribe(res =>{
      console.log(res);
    })
  }

}
