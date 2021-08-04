import { Component, OnDestroy, OnInit } from '@angular/core';
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

  alertM: any;
  mensajeAlert: string;
  alert: any;
  cargando: boolean;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.alert = false;
    this.alertM = false;
    this.cargando = true;
    this.detalleBlog ='';
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.subscription.add(this.getService.obtenerJaulasPorId(this.idJaula).subscribe(res => {
      console.log(res)
      this.jaula = res;
      this.cargando = false;
    }))
    setTimeout(() => {
      this.subscription.add(this.getService.obtenerEspacioFisico(this.jaula.id_espacioFisico).subscribe(res =>{
        this.espacioFisico = res;
      }))
      if(this.jaula.id_proyecto != 0){
      this.subscription.add(this.getService.obtenerProyectosPorId(this.jaula.id_proyecto).subscribe(res =>{
        this.miProyecto = res
        console.log(res)
      }))
      }
    },500);
    this.subscription.add(this.getService.obtenerAnimalesPorJaula(this.idJaula).subscribe(res => {
      if(!res.Status){
        this.animales = res;
      }
      console.log(res)
    }))
    this.subscription.add( this.getService.obtenerProyectos().subscribe(res => {
      this.proyectos = res.filter(proyecto => !proyecto.finalizado );
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
      console.log(res)
      this.blogs = res;
    }))
  }

  open(content): void {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  
  asociar(){
    const datos: any = {
      id_jaula : this.idJaula,
      id_proyecto : this.idProyecto_asociar
    }
    this.subscription.add(this.postService.asignarJaulaProyecto(datos).subscribe(res => {
      console.log(res)
      if (res.status === 'Se asignó la jaula al proyecto'){
        this.alertM = 'ok';
        this.mensajeAlert = 'Jaula asociada correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 2000);
      }
      } , err => {
        this.alertM = 'error';
        this.mensajeAlert = JSON.stringify(err.error.error);
        console.log(err)
    }))
  }
  eliminarJaula(){
  this.subscription.add(this.postService.eliminarJaula(this.idJaula).subscribe(res =>{
      if (res.Status === 'Ok'){
        this.alert = 'ok';
        this.mensajeAlert = 'Jaula eliminada correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.router.navigate(['/home/bioterio']);
        }, 1000);
      }
      console.log(res)
    }, err => {
      this.alert = 'error';
      this.mensajeAlert ='La jaula debe estar vacía para poder darla de baja';
      setTimeout(() => {
        this.modalService.dismissAll()
        this.ngOnInit()
      }, 2000);
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
        this.blogs = res;
        console.log(res) }))
    }, 1000);
  }

  crearBlog(): void{
    const Blog: Blogs={
      id_usuario: 1,
      detalle: this.detalleBlog,
      tipo: 'Jaula'
    }
    const nuevoBlog : BlogJaula={
      id_jaula: this.idJaula,
      blogs: Blog
    }
    this.subscription.add( this.postService.nuevoBlogJaula(nuevoBlog).subscribe(res => {
      if (res.Status === 'Ok'){
        this.alertM = 'ok';
        this.mensajeAlert = 'Blog creado correctamente';
        setTimeout(() => {
          this.alertM = false;
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alertM = 'error';
      this.mensajeAlert = JSON.stringify(err);
      console.log(err)
      setTimeout(() => {
        this.modalService.dismissAll()
        this.ngOnInit()
      }, 2000);
    }));
  }

  eliminarAnimal(){
    this.subscription.add(this.postService.eliminarAnimal(this.idAnimal_eliminar).subscribe(res =>{
      if (res.Status === "Se dio de baja el animal con id "+ this.idAnimal_eliminar){
        this.alert = 'ok';
        this.mensajeAlert = 'Animal eliminado correctamente';
        setTimeout(() => {
          this.animales = [];
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 1500);
      }
      console.log(res)
    }, err => {
      this.alert = 'error';
      this.mensajeAlert = JSON.stringify(err);
      console.log(err)
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

