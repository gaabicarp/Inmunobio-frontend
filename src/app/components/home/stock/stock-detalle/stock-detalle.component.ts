import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import { Producto } from '../../../../models/producto.model';
import { Consumir, ProductoStock, Stock } from '../../../../models/stock.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogBuscados, BlogEspacio, BlogHerramienta, Blogs, BlogsBuscadosEspFisico, BlogsBuscadosHerr } from 'src/app/models/blogs.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EspacioFisico } from 'src/app/models/EspacioFisico.model';
import { Herramienta } from 'src/app/models/herramientas.model';
import { ToastServiceService } from 'src/app/services/toast-service.service';

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
  herramientas : Herramienta[] =[];
  herramientasFiltradas: Herramienta[] =[];
  filtroFechaVenc:any;
  
  fecDesde:any;
  fecHasta:any;
  fecHoy=new Date(Date.now());
  blogs : BlogBuscados[] =[];
  blogsH:any;
  detalleBlog:any;

  filterPost: string;
  filterPost2: string;
  cargando:boolean;
  a:any;
  j:any;
  prodEspecifico:ProductoStock;
  cantidad:number;
  idHerramienta_eliminar:number;
  content:any;
  tipo = 'opc1';
  tipoBlog= 'espacioFisico';
  herramientaSeleccionada:number ;
  herramientaSeleccionadaBlog:any;
  disabledForm: boolean;
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.filterPost ='';
    this.filterPost2 ='';
    this.filtroFechaVenc = '-1';
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    console.log(this.idEspacioFisico);
    //STOCK
    this.subscription.add( this.getService.obtenerStock(this.idEspacioFisico).subscribe(res => {
      console.log(res)
      if(res){
        this.stocks = res;
        this.cargando = false;
      } else {
        this.stocks = [];
        this.cargando = false;
      }
       })
    );
    this.subscription.add( this.getService.obtenerEspacioFisico(this.idEspacioFisico).subscribe(res => {
      if(res){
        this.espacioFisico = res; 
        this.cargando = false;
      } else{
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res);
    })
    );
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
      if(res){
        this.productos = res ;
        this.cargando = false;
      } else{
        this.productos= [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res);
       })
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
      if(res){
        this.blogs = res;
        this.cargando = false;
      } else{
        this.blogs = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res);
       })
    );
    //HERRAMIENTAS 
    this.subscription.add( this.getService.obtenerHerramientas().subscribe(res => {
      if(res){
        this.herramientas = res;
        this.cargando = false;
      } else{
        this.herramientas = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res)
      const id = this.idEspacioFisico
      this.herramientasFiltradas =  this.herramientas.filter(herramienta => {
        return herramienta.id_espacioFisico == id;
      });
      console.log(this.herramientasFiltradas)
       })
    );
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
        if(res){
          this.blogs = res;
          this.cargando = false;
        } else{
          this.blogs = [];
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
        console.log(res);
      })
      );
    } else {
      const blog : BlogsBuscadosEspFisico = {
        id_espacioFisico: this.idEspacioFisico,
        fechaDesde: this.fecDesde,
        fechaHasta: this.fecHasta
      }
      this.subscription.add(this.postService.obtenerBlogEspacioFisico(blog).subscribe(res =>{
        if(res){
          this.blogs = res;
          this.cargando = false;
        } else{
          this.blogs = [];
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
        console.log(res);
       })
      );
    }
  }
  eliminarP(a,j,content){
    this.open(content,'lg');
    this.a = a.id_productoEnStock;
    this.j=a.producto[j].id_productos;
  }

  eliminarStockModal(){
    this.disabledForm = true;
    const id_productoEnStock= this.a
    const id_productos = this.j
    this.subscription.add( this.postService.eliminarStock(id_productoEnStock, id_productos).subscribe(res =>{
      if (res.Status === 'Se borró el producto en stock.'){
        this.toastService.show('Stock eliminado', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm = false;
          this.ngOnInit()
        }, 1000);
      }
      console.log(res); 
    }, err => {
      this.toastService.show('Problema al eliminar el stock' + err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.modalService.dismissAll()
        this.toastService.removeAll()
        this.disabledForm = false;
      }, 4000);
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
    if(res){
      this.blogsH = res;
      this.cargando = false;
    } else{
      this.blogsH = [];
      this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
      this.cargando = false;
    }
    console.log(res);
   })
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
      if(res){
        this.blogsH = res;
        this.cargando = false;
      } else{
        this.blogsH = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res);
    })
    );
  }
  consumirP(a,j,content){
    this.open(content,'lg');
    this.a= a;
    this.j = j;
    setTimeout(() => {
      const producto = this.stocks.find(stock => (stock.id_producto == a.id_producto) && (stock.id_productoEnStock == a.id_productoEnStock))
      console.log(producto)
      this.prodEspecifico = producto.producto[j]
      console.log(this.prodEspecifico)
    }, 500);
    
  }
  consumirStockModal(){
    this.disabledForm = true;
    const idProdEnStock = this.a.id_productoEnStock;
    setTimeout(() => {
      const consumir : Consumir ={
        unidad: this.cantidad,
        id_productoEnStock : idProdEnStock,
        id_productos: this.prodEspecifico.id_productos
      }
      this.subscription.add(this.postService.consumirStock(consumir).subscribe(res =>{
        if (res.Status === 'Se modificaron las unidades del producto en stock.'){
          this.toastService.show('Stock consumido', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
            this.modalService.dismissAll()
            this.disabledForm = false;
            this.cantidad = 0;
            this.ngOnInit()
          }, 2000);
        }
        console.log(res)
      }, err => {
        this.toastService.show( 'La cantidad solicitada no se encuentra en stock', { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
        setTimeout(() => {
          this.toastService.removeAll()
          this.disabledForm = false;
        }, 3000);
      }));
    }, 500);
  }
  eliminarHModal(id,content){
    this.open(content,'lg');
    this.idHerramienta_eliminar = id;
  }
  eliminarH(){
    this.disabledForm = true;
    console.log(this.idHerramienta_eliminar)
    this.subscription.add(this.postService.eliminarHerramienta(this.idHerramienta_eliminar).subscribe(res =>{
      if (res.Status === 'Se elimino la herramienta.'){
        this.toastService.show('Herramienta eliminada', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm = false;
          this.ngOnInit()
        }, 1000);
      }
      console.log(res);
    }, err => {
      this.toastService.show( 'Problema al eliminar la herramienta '+ err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.toastService.removeAll()
        this.disabledForm = false;
      }, 3000);

    }));
  }
  crearBlogHerramienta(){
    this.disabledForm = true;
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
      if (res.Status === 'Se creo el blog de herramienta'){
        this.toastService.show('Blog creado', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.detalleBlog = ''
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm = false;
          this.ngOnInit()
          setTimeout(() => {
            this.Herramienta(this.a,this.content)
          }, 1000);
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.toastService.show( 'Problema al crear el blog '+err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.toastService.removeAll()
        this.disabledForm = false;
      }, 3000);

    }));
  }
  crearBlog(){
    this.disabledForm = true;
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
        if (res.Status === 'Se creo el blog de herramienta'){
          this.toastService.show('Blog creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.detalleBlog = '';
            this.toastService.removeAll()
            this.modalService.dismissAll()
            this.disabledForm = false;
            this.ngOnInit()
          }, 2000);
        }
        console.log(res)
      }, err => {
        this.toastService.show( 'Problema al crear el blog '+err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
        this.disabledForm = false;
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
      if (res.Status === 'Se creó blog de espacio físico.'){
        this.toastService.show('Blog creado', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.detalleBlog = '';
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm = false;
          this.ngOnInit()
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.toastService.show( 'Problema al crear el blog '+err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.toastService.removeAll()
        this.disabledForm = false;
      }, 3000);
    }));
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

