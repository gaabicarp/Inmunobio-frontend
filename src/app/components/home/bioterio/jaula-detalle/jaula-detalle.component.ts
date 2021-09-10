import { Component, OnDestroy, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EspacioFisico } from 'src/app/models/EspacioFisico.model';
import { Jaula } from 'src/app/models/jaula.model';
import { Animal } from 'src/app/models/animal.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Proyecto } from 'src/app/models/proyectos.model';
import { BlogBuscadoJaula, BlogJaula, Blogs, BlogsJaula } from 'src/app/models/blogs.model';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { ignoreElements } from 'rxjs/operators';


@Component({
  selector: 'app-jaula-detalle',
  templateUrl: './jaula-detalle.component.html',
  styleUrls: ['./jaula-detalle.component.css']
})
export class JaulaDetalleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  idJaula!: number;
  jaula: Jaula;
  espacioFisico: EspacioFisico;

  // animales:Animal[];
  animales=[];
  idAnimal_eliminar:number;

  proyectos: Proyecto[];
  miProyecto:Proyecto;
  idProyecto_asociar:number;

  fecHoy=new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  blogs: BlogsJaula[];
  detalleBlog: string;
  usuario:any;
  cargando: boolean;
  disabledForm: boolean;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.detalleBlog ='';
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.subscription.add(this.getService.obtenerJaulasPorId(this.idJaula).subscribe(res => {
      if(res){
        console.log(res);
        this.jaula = res;
      } else{
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    }))
    setTimeout(() => {
      this.subscription.add(this.getService.obtenerEspacioFisico(this.jaula.id_espacioFisico).subscribe(res =>{
        if(res){
          this.espacioFisico = res;
        } else{
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
      }))
      if(this.jaula.id_proyecto != 0){
      this.subscription.add(this.getService.obtenerProyectosPorId(this.jaula.id_proyecto).subscribe(res =>{
        if(res){
          this.miProyecto = res
          this.cargando = false;
        } else{
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
        console.log(res)
      }))
      }

    },1000);
    this.subscription.add(this.getService.obtenerAnimalesPorJaula(this.idJaula).subscribe(res => {
      if(!res.Status){
        this.animales = res;
      } else{
        this.animales=[];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res)
    }))
    this.subscription.add( this.getService.obtenerProyectos().subscribe(res => {
      if(res){
      this.proyectos = res.filter(proyecto => !proyecto.finalizado );
    } else{
      this.proyectos=[];
      this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
      this.cargando = false;
    }
      console.log(res)

    }))
    //Blogs
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogBuscadoJaula = {
          id_jaula: this.idJaula,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    console.log(blog)
    this.subscription.add(this.postService.obtenerBlogJaula(blog).subscribe(res =>{
      if(res){
        this.blogs = res;
      } else{
        this.blogs=[];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
        console.log(res)
    }))
  }

  open(content): void {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  
  asociar(){
    this.disabledForm = true;
    const datos: any = {
      id_jaula : this.idJaula,
      id_proyecto : this.idProyecto_asociar
    }
    this.subscription.add(this.postService.asignarJaulaProyecto(datos).subscribe(res => {
      console.log(res)
      if (res.status === 'Se asignó la jaula al proyecto.'){
        this.toastService.show('Jaula asociada', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm =false;
          this.ngOnInit()
        }, 2000);
      }} , err => {
        this.toastService.show('Problema al asociar jaula' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
        setTimeout(() => {
          this.disabledForm = false;
          this.modalService.dismissAll()
          this.toastService.removeAll()
        }, 4000);
    }))
  }
  eliminarJaula(){
    this.disabledForm = true;
  this.subscription.add(this.postService.eliminarJaula(this.idJaula).subscribe(res =>{
      if (res.Status === 'Se dió de baja la jaula.'){
        this.toastService.show('Jaula eliminada', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm = false;
          this.router.navigate(['/home/bioterio']);
        }, 1000);
      }
      console.log(res)
    }, err => {
      this.toastService.show( err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.modalService.dismissAll()
        this.toastService.removeAll()
        this.disabledForm = false;
      }, 4000);
    }))
  }
  Buscar(){
    this.fecDesde =  new Date(this.fecDesde.year,(this.fecDesde.month -1)  ,this.fecDesde.day)
    const fechaHasta = new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    const diaMas1 = (fechaHasta).getDate() + 2;
    this.fecHasta = new Date(fechaHasta.getFullYear(),fechaHasta.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogBuscadoJaula = {
      id_jaula: this.idJaula,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    setTimeout(() => {
      this.subscription.add(this.postService.obtenerBlogJaula(blog).subscribe(res =>{
        if(res){
          this.blogs = res;
        } else{
          this.blogs=[];
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
          console.log(res) }))
    }, 1000);
  }

  crearBlog(): void{
    this.disabledForm = true;
    const Blog: Blogs={
      id_usuario:this.usuario.id,
      detalle: this.detalleBlog,
      tipo: 'Jaula'
    }
    const nuevoBlog : BlogJaula={
      id_jaula: this.idJaula,
      blogs: Blog
    }
    this.subscription.add( this.postService.nuevoBlogJaula(nuevoBlog).subscribe(res => {
      if (res.Status === 'Se creó el blog de jaula.'){
        this.toastService.show('Blog creado', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm = false;
          this.ngOnInit()
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.toastService.show('Problema al crear el blog' + err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.toastService.removeAll()
        this.modalService.dismissAll()
        this.disabledForm = false;
      }, 4000);
    }));
  }

  eliminarAnimal(){
    this.disabledForm = true;
    this.subscription.add(this.postService.eliminarAnimal(this.idAnimal_eliminar).subscribe(res =>{
      if (res.Status === "Se dio de baja el animal con id "+ this.idAnimal_eliminar){
        this.toastService.show('Animal eliminado', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.animales = [];
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm = false;
          this.ngOnInit()
        }, 1500);
      }
      console.log(res)
    }, err => {
      this.toastService.show('Problema al eliminar el animal ' + err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.toastService.removeAll()
        this.modalService.dismissAll()
        this.disabledForm = false;
      }, 4000);
    }))
  }
  eliminarModalAnimal(id:number,content){
    this.idAnimal_eliminar = id;
    this.open(content)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

