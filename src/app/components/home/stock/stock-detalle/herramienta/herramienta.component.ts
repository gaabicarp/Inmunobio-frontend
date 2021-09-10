import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlogHerramienta, BlogsBuscadosHerr } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-herramienta',
  templateUrl: './herramienta.component.html',
  styleUrls: ['./herramienta.component.css']
})
export class HerramientaComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  @Input() herramienta:any;
  blogsH:any;
  fecDesde:any;
  fecHasta:any;
  fecHoy=new Date(Date.now());
  cargando:boolean;
  idHerramienta_eliminar:number;
  disabledForm:boolean;
  usuario:any;
  detalleBlog :string;
  modal : NgbModalRef;
  idEspacioFisico:number;
  constructor
    (private activatedRouter: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private modalService: NgbModal,
    public toastService: ToastServiceService) { }

  ngOnInit(): void {
      this.detalleBlog='';
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
      const dia = (this.fecHoy).getDate() + 1;
      this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
      this.fecHasta = this.fecHasta.toDateString();
      const blog : BlogsBuscadosHerr = {
        id_herramienta: this.herramienta.id_herramienta,
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
  open(content, size): void {
    this.modal = this.modalService.open(content, { centered: true, size: size });
  }

  crearBlogHerramienta(){
    this.disabledForm = true;
    const nuevoBlog : BlogHerramienta ={
      id_herramienta: this.herramienta.id_herramienta,
      blogs: {
        id_usuario: this.usuario.id,
        detalle: this.detalleBlog,
        tipo :'herramienta'
      }
    }
    console.log(nuevoBlog)
    this.subscription.add(this.postService.crearBlogHerramienta(nuevoBlog).subscribe(res => {
      if (res.Status === 'Se creo el blog de herramienta'){
        this.toastService.show('Blog creado', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.detalleBlog = ''
          this.toastService.removeAll();
          this.modal.close()
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
  BuscarBlogH(){
    this.fecDesde =  new Date(this.fecDesde.year,(this.fecDesde.month -1)  ,this.fecDesde.day)
    const fechaHasta = new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    console.log(this.fecDesde, fechaHasta)
    const diaMas1 = (fechaHasta).getDate() + 2;
    this.fecHasta = new Date(fechaHasta.getFullYear(),fechaHasta.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogsBuscadosHerr = {
      id_herramienta: this.herramienta.id_herramienta,
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

}
