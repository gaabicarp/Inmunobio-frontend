import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Producto } from 'src/app/models/producto.model'
import { ProductoEdic, ProductoStock, Stock, StockEdicion } from 'src/app/models/stock.model';
import { Contenedor } from 'src/app/models/contenedores.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css'],
  providers: [DatePipe]
})

export class AgregarStockComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  usuario:any;
  productos: Producto[] = [];
  contenedores: Contenedor[] = [];
  contenedoresEspecificos: Contenedor[]=[];
  
  
  formStock!: FormGroup;

  idEspacioFisico:number;
  idProd:number;
  idProdEnStock:number;
  idUbicacion:number;
  stocks:Stock[]=[];
  producto:any;
  prodEspecifico:any;
  editar = false;
  cargando: boolean;
  disabledForm: boolean;
 
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService, 
    public datepipe: DatePipe,
    public toastService: ToastServiceService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.cargando = true;
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario)
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.idProd = parseInt(this.activatedRouter.snapshot.paramMap.get('idProducto'), 10);
    this.idProdEnStock = parseInt(this.activatedRouter.snapshot.paramMap.get('idProductoEnStock'), 10);
    this.idUbicacion = parseInt(this.activatedRouter.snapshot.paramMap.get('idUbicacion'), 10);
    console.log(this.idProd)
    console.log(this.idUbicacion)
    const idGrupoTrabajo = this.usuario.id_grupoDeTrabajo
    console.log(idGrupoTrabajo)
    this.formStock = new FormGroup({
      producto: new FormControl('0', [Validators.required, Validators.maxLength(30)]),
      lote: new FormControl('', [Validators.maxLength(50)]),
      unidad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      contenedor: new FormControl('0', [Validators.maxLength(30)]),
      detalleUbicacion: new FormControl('', [Validators.maxLength(50)]),
      fechaVencimiento: new FormControl('', [Validators.maxLength(11)]),
      seguimiento: new FormControl('',[Validators.required])
    });
    if (!isNaN(this.idProd)){
      this.getService.obtenerStock(this.idEspacioFisico,idGrupoTrabajo).subscribe(res =>{
        if(res){
          this.stocks = res;
          this.cargando = false;
        } else{
          this.stocks = [];
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
        console.log(res)
        this.producto = this.stocks.find(stock => (stock.id_producto = this.idProd) && (stock.id_productoEnStock == this.idProdEnStock))
        console.log(this.producto)
        this.prodEspecifico = this.producto.producto[this.idUbicacion]

        this.formStock.patchValue({
          producto: this.producto.id_producto,
          lote: this.prodEspecifico.lote,
          unidad: this.prodEspecifico.unidad,
          contenedor: this.prodEspecifico.codigoContenedor,
          detalleUbicacion: this.prodEspecifico.detalleUbicacion,
          fechaVencimiento: this.datepipe.transform(this.prodEspecifico.fechaVencimiento, 'yyyy-MM-dd')
        });
      })
      this.editar = true;
    }
    this.subscription.add( this.getService.obtenerProductos().subscribe(res => {
      if(res){
        console.log(res);
        this.productos = res;
      } else{
        this.productos = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res)
    }));
    this.subscription.add( this.getService.obtenerContenedores().subscribe(res => {
      if(res){
        console.log(res);
        this.contenedores = res.filter( contenedor => contenedor.id_espacioFisico == this.idEspacioFisico);
      } else{
        this.contenedores = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res)
    }));
    this.cargando = false;
    
  }

  agregarStock(): void{
    this.disabledForm = true;
    let estado = false;
    const checkbox = document.getElementById('seguimiento') as HTMLInputElement ;
    const estaTrue = checkbox.checked;
    if (estaTrue){
        estado = true;
    }
    var fecha = this.formStock.value.fechaVencimiento;
    const productoEnStock : any = {
      lote: this.formStock.value.lote,
      unidad: this.formStock.value.unidad,
      codigoContenedor: this.formStock.value.contenedor,
      detalleUbicacion: this.formStock.value.detalleUbicacion,
      fechaVencimiento: this.datepipe.transform( fecha,'yyyy-MM-ddT23:01:10.288Z')
    }
    const stock : Stock = {
      id_grupoDeTrabajo : 1 ,
      id_espacioFisico : this.idEspacioFisico ,
      id_producto: this.formStock.value.producto,
      producto: productoEnStock,
      seguimiento: estado
    };
    console.log(stock)
    if (!isNaN(this.idProd)){
      const prod : ProductoEdic = {
        codigoContenedor: this.formStock.value.contenedor,
        detalleUbicacion : this.formStock.value.detalleUbicacion,
        unidad : 0,
        id_productos : this.prodEspecifico.id_productos
      }
      const edicion : StockEdicion = {
        id_productoEnStock: this.producto.id_productoEnStock,
        producto: prod
      }
    this.postService.editarStock(edicion).subscribe(res => {
      if (res.Status === 'Se modifico el stock'){
        this.toastService.show('Información editada ', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.disabledForm = false;
          this.router.navigate(['/home/stock/'+ this.idEspacioFisico]);
        }, 2000);
      }
      console.log(res);
    }, err => {
      this.toastService.show('Problema al editar la información '+ err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.toastService.removeAll()
        this.disabledForm = false;
      }, 3000);
    });
    } else {
        this.postService.agregarStock(stock).subscribe(res => {
          if (res.Status === 'Se creo el producto en stock.'){
            this.toastService.show('Producto en stock agregado correctamente ', { classname: 'bg-success text-light', delay: 2000 });
            setTimeout(() => {
              this.toastService.removeAll()
              this.disabledForm = false;
              this.router.navigate(['/home/stock/'+ this.idEspacioFisico]);
            }, 2000);
          }
          console.log(res);
        }, err => {
          this.toastService.show( 'Problema al agregar producto en stock '+err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
          console.log(err)
          setTimeout(() => {
            this.toastService.removeAll()
            this.disabledForm = false;
          }, 3000);
        });
    }
  }
}

