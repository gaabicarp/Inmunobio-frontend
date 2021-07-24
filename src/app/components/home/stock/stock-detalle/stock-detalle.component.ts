import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import {Producto} from '../../../../models/producto.model';
import { Consumir, Stock } from '../../../../models/stock.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogHerramienta, BlogsBuscados, BlogsBuscadosHerr } from 'src/app/models/blogs.model';
import { Herramienta } from 'src/app/models/herramientas.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stock-detalle',
  templateUrl: './stock-detalle.component.html',
  styleUrls: ['./stock-detalle.component.css']
})
export class StockDetalleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  stocks=[];
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

  herramientas =[];
  herramientasFiltradas=[];

  estado: string;
  mensajeAlert: string;
  alert: boolean;
  estadoOK: string;
  mensajeAlertOK: string;
  alertOK: boolean;
  filterPost: string;
  filterPost2: string;
  estadoM: string;
  mensajeAlertM: string;
  alertM: boolean;

  a:any;
  j:any;
  producto:any;
  prodEspecifico:any;
  cantidad:number;
  blogsH:any;
  detalleBlog:any;
  id:number;
  content:any;
  
  
  
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.alert = false;
    this.filterPost = '';
    this.filterPost2 = '';
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
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      filtro: new FormControl(),
      herramienta: new FormControl()
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
  open(content, size): void {
    this.modalService.open(content, { centered: true, size: size });
  }
  Buscar(){
    this.fecDesde =  new Date(this.formFecha.value.fecDesde.year,(this.formFecha.value.fecDesde.month -1)  ,this.formFecha.value.fecDesde.day)
    this.fecHastaReal =   new Date(this.formFecha.value.fecHasta.year,(this.formFecha.value.fecHasta.month -1) ,this.formFecha.value.fecHasta.day)
    console.log(this.fecDesde, this.fecHastaReal)
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();

    if(this.formFecha.value.filtro == 'herramienta'){
      const blog: any ={
        id_herramienta: this.formFecha.value.herramienta,
        fechaDesde: this.fecDesde,
        fechaHasta: this.fecHasta
      }
      this.subscription.add(this.postService.obtenerBlogHerramientas(blog).subscribe(res =>{
        console.log(res);
        this.blogs = res; })
      );
    } else {
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
    
    
  }
  eliminarP(a,j,content){
    this.open(content,'lg');
    this.a = a.id_productoEnStock;
    this.j=a.producto[j].id_productos;
  }
  eliminarStockModal(){
    const id_productoEnStock= this.a
    const id_productos = this.j
    this.subscription.add( this.postService.eliminarStock(id_productoEnStock, id_productos).subscribe(res =>{
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Stock eliminado correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 500);
      }
      console.log(res); 
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);;
    }));
  }
  Herramienta(a,content){
    this.open(content,'xl');
    this.content = content;
    this.a = a
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogsBuscadosHerr = {
      id_herramienta: this.a.id_herramienta,
      fechaDesde: 'Mon May 31 2021',
      fechaHasta: this.fecHasta
    } 
  console.log(blog)
  this.subscription.add(this.postService.obtenerBlogHerramientas(blog).subscribe(res =>{
    console.log(res);
    this.blogsH = res; })
  );
  }
  BuscarBlogH(){
    this.fecDesde =  new Date(this.fecDesde.year,(this.fecDesde.month -1)  ,this.fecDesde.day)
    this.fecHastaReal =   new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    console.log(this.fecDesde, this.fecHastaReal)
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogsBuscadosHerr = {
      id_herramienta: this.a.id_herramienta,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    console.log(blog)
    this.subscription.add(this.postService.obtenerBlogHerramientas(blog).subscribe(res =>{
      console.log(res);
      this.blogsH = res; })
    );
  }
  consumirP(a,j,content){
    this.open(content,'lg');
    this.a= a;
    this.j = j;
    setTimeout(() => {
      this.producto = this.stocks.find(stock => (stock.id_producto == a.id_producto) && (stock.id_productoEnStock == a.id_productoEnStock))
      console.log(this.producto)
      this.prodEspecifico = this.producto.producto[j]
      console.log(this.prodEspecifico)
    }, 500);
    
  }
  consumirStockModal(){
    const idProdEnStock = this.a.id_productoEnStock;
    setTimeout(() => {
      const consumir : Consumir ={
        unidad: this.cantidad,
        id_productoEnStock : idProdEnStock,
        id_productos: this.prodEspecifico.id_productos
      }
      this.postService.consumirStock(consumir).subscribe(res =>{
        if (res.Status === 'ok'){
          this.alertOK = true;
          this.estado = 'success';
          this.mensajeAlertOK = 'Stock consumido correctamente';
          setTimeout(() => {
            this.modalService.dismissAll()
            this.ngOnInit()
          }, 2000);
        }
        console.log(res)
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = 'ERROR - La cantidad solicitada no se encuentra en stock';
      });
    }, 500);
  }
  eliminarHModal(id,content){
    this.open(content,'lg');
    this.id = id;
  }
  eliminarH(){
    console.log(this.id)
    this.postService.eliminarHerramienta(this.id).subscribe(res =>{
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Herramienta eliminada correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 1000);
      }
      console.log(res);
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);;
    });
  }
  crearBlog(){
    const blog: any ={
      id_usuario: 1,
      detalle: this.detalleBlog,
      tipo :'Herramienta'
    }
    const nuevoBlog : BlogHerramienta ={
      id_herramienta: this.a.id_herramienta,
      blogs: blog
    }
    console.log(nuevoBlog)
    this.postService.crearBlogHerramienta(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alertM = true;
        this.estadoM = 'success';
        this.mensajeAlertM = 'Blog creado correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.ngOnInit()
          setTimeout(() => {
            this.Herramienta(this.a,this.content)
          }, 1000);
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alertM = true;
      this.estadoM = 'danger';
      this.mensajeAlertM = JSON.stringify(err);
      console.log(err)
      // setTimeout(() => {
      //   this.modalService.dismissAll()
      //   this.ngOnInit()
      // }, 2000);
    });
  }

}
