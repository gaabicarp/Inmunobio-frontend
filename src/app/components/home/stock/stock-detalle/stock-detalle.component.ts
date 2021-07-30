import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import { Producto } from '../../../../models/producto.model';
import { Consumir, ProductoStock, Stock } from '../../../../models/stock.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogBuscados, BlogEspacio, BlogHerramienta, Blogs, BlogsBuscadosEspFisico, BlogsBuscadosHerr } from 'src/app/models/blogs.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EspacioFisico } from 'src/app/models/EspacioFisico.model';
import { Herramienta } from 'src/app/models/herramientas.model';

@Component({
  selector: 'app-stock-detalle',
  templateUrl: './stock-detalle.component.html',
  styleUrls: ['./stock-detalle.component.css']
})
export class StockDetalleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  stocks: Stock[] =[];
  productos: Producto[]=[];
  idEspacioFisico:number;
  espacioFisico:EspacioFisico;

  fecDesde:any;
  fecHasta:any;
  fecHoy=new Date(Date.now());
  blogs : BlogBuscados[] =[];

  herramientas : Herramienta[] =[];
  herramientasFiltradas: Herramienta[] =[];
  filterPost: string;
  filterPost2: string;

  estado: string;
  mensajeAlert: string;
  alert: boolean;
  estadoOK: string;
  mensajeAlertOK: string;
  alertOK: boolean;
  estadoModal: string;
  mensajeAlertModal: string;
  alertModal: boolean;

  a:any;
  j:any;
  producto:Stock;
  prodEspecifico:ProductoStock;
  cantidad:number;
  blogsH:any;
  detalleBlog:any;
  idHerramienta_eliminar:number;
  content:any;

  tipo = 'espacioFisico';
  tipoBlog= 'espacioFisico';
  herramientaSeleccionada:number;
  herramientaSeleccionadaBlog:any;
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.alert = false;
    this.alertOK = false;
    this.alertModal = false;
    this.filterPost ='';
    this.filterPost2 ='';
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
    const blog : BlogsBuscadosEspFisico = {
          id_espacioFisico: this.idEspacioFisico,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    console.log(blog)
    this.subscription.add(this.postService.obtenerBlogEspacioFisico(blog).subscribe(res =>{
      console.log(res);
      this.blogs = res; })
    );
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
    this.fecDesde =  new Date(this.fecDesde.year,(this.fecDesde.month -1)  ,this.fecDesde.day)
    const fechaHasta = new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    console.log(this.fecDesde, fechaHasta)
    const diaMas1 = (fechaHasta).getDate() + 2;
    this.fecHasta = new Date(fechaHasta.getFullYear(),fechaHasta.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    if(this.tipo == 'herramienta'){
      const blog: BlogsBuscadosHerr ={
        id_herramienta: this.herramientaSeleccionada,
        fechaDesde: this.fecDesde,
        fechaHasta: this.fecHasta
      }
      this.subscription.add(this.postService.obtenerBlogHerramientas(blog).subscribe(res =>{
        console.log(res);
        this.blogs = res; })
      );
    } else {
      const blog : BlogsBuscadosEspFisico = {
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
    this.a = a;
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
    const fechaHasta = new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    console.log(this.fecDesde, fechaHasta)
    const diaMas1 = (fechaHasta).getDate() + 2;
    this.fecHasta = new Date(fechaHasta.getFullYear(),fechaHasta.getMonth(), diaMas1)
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
      this.subscription.add(this.postService.consumirStock(consumir).subscribe(res =>{
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
      }));
    }, 500);
  }
  eliminarHModal(id,content){
    this.open(content,'lg');
    this.idHerramienta_eliminar = id;
  }
  eliminarH(){
    console.log(this.idHerramienta_eliminar)
    this.subscription.add(this.postService.eliminarHerramienta(this.idHerramienta_eliminar).subscribe(res =>{
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
    }));
  }
  crearBlogHerramienta(){
    const blog: Blogs ={
      id_usuario: 1,
      detalle: this.detalleBlog,
      tipo :'herramienta'
    }
    const nuevoBlog : BlogHerramienta ={
      id_herramienta: this.a.id_herramienta,
      blogs: blog
    }
    console.log(nuevoBlog)
    this.subscription.add(this.postService.crearBlogHerramienta(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alertModal = true;
        this.estadoModal = 'success';
        this.mensajeAlertModal = 'Blog creado correctamente';
        setTimeout(() => {
          this.detalleBlog = ''
          this.modalService.dismissAll()
          this.ngOnInit()
          setTimeout(() => {
            this.Herramienta(this.a,this.content)
          }, 1000);
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alertModal = true;
      this.estadoModal = 'danger';
      this.mensajeAlertModal = JSON.stringify(err);
      console.log(err)
    }));
  }
  crearBlog(){
    if(this.tipoBlog === 'herramienta'){
      const blog: Blogs ={
        id_usuario: 1,
        detalle: this.detalleBlog,
        tipo :'herramienta'
      }
      const nuevoBlog : BlogHerramienta ={
        id_herramienta: this.herramientaSeleccionadaBlog,
        blogs: blog
      }
      console.log(nuevoBlog)
      this.subscription.add( this.postService.crearBlogHerramienta(nuevoBlog).subscribe(res => {
        if (res.Status === 'ok'){
          this.alertModal = true;
          this.estadoModal = 'success';
          this.mensajeAlertModal = 'Blog creado correctamente';
          setTimeout(() => {
            this.detalleBlog = '';
            this.modalService.dismissAll()
            this.ngOnInit()
          }, 2000);
        }
        console.log(res)
      }, err => {
        this.alertModal = true;
        this.estadoModal = 'danger';
        this.mensajeAlertModal = JSON.stringify(err);
        console.log(err)
      }));
    } else{
    const blog: Blogs ={
      id_usuario: 1,
      detalle: this.detalleBlog,
      tipo :'espacioFisico'
    }
    const nuevoBlog : BlogEspacio ={
      id_espacioFisico: this.idEspacioFisico,
      blogs: blog
    }
    this.subscription.add( this.postService.crearBlogEspacio(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Blog creado correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    }));
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

