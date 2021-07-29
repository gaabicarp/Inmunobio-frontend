import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { EspacioFisico } from 'src/app/models/EspacioFisico.model';
import { Jaula } from 'src/app/models/jaula.model';
import { Animal } from 'src/app/models/animal.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Proyecto } from 'src/app/models/proyectos.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogBuscadoJaula, BlogJaula, BlogsJaula } from 'src/app/models/blogs.model';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Component({
  selector: 'app-jaula-detalle',
  templateUrl: './jaula-detalle.component.html',
  styleUrls: ['./jaula-detalle.component.css']
})
export class JaulaDetalleComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  idJaula!: number;
  jaula: Jaula;
  espacioFisico: EspacioFisico;
  mensajeAlert: string;
  estado: string;
  alert: boolean;
  animales=[];
  proyectos: Proyecto[];
  miProyecto:Proyecto;
  fecHoy=new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  fecHastaReal:any;
  formFecha!:FormGroup;
  formProyecto!:FormGroup;
  blogs: BlogsJaula;

  proyecto:any;
  mensajeAlertM: string;
  estadoM: string;
  alertM: boolean;
  detalleBlog:string;
  id:number;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.alert = false;
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.subscription.add(this.getService.obtenerJaulasPorId(this.idJaula).subscribe(res => {
      console.log(res)
      this.jaula = res;
    }))
    setTimeout(() => {
      this.subscription.add(this.getService.obtenerEspacioFisico(this.jaula.id_espacioFisico).subscribe(res =>{
        this.espacioFisico = res;
      }))
    },500);
    this.subscription.add(this.getService.obtenerAnimalesPorJaula(this.idJaula).subscribe(res => {
      if(!res.Status){
        this.animales = res;
      }
      console.log(res)
    }))
    this.subscription.add(this.getService.obtenerProyectos().subscribe(res => {
      this.proyectos = res.filter(proyecto => !proyecto.finalizado );
      console.log(res)
    }))
    //MEJORAR
    setTimeout(() => {
      this.miProyecto = this.proyectos.find(proyecto => proyecto.id_proyecto === this.jaula.id_proyecto)
      console.log(this.miProyecto)
    }, 1000);

    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    console.log(this.fecHasta)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogBuscadoJaula = {
          id_jaula: this.idJaula,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    console.log(blog)
    this.subscription.add(this.postService.obtenerBlogJaula(blog).subscribe(res =>{
      console.log(res)
      if(!res.Status){
        this.blogs = res;
      }
    }))

    this.formFecha = new FormGroup({
      fecDesde: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)])
    })
    this.formProyecto = new FormGroup({
      id_proyecto : new FormControl('', [Validators.required, ]) })
  }
  open(content): void {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  
  asociar(){
    this.getService.obtenerProyectosPorId(this.formProyecto.value.id_proyecto).subscribe(res =>{
      this.proyecto = res;
    })
    setTimeout(() => {
      console.log(this.proyecto)
    const datos: any = {
      id_jaula : this.idJaula,
      id_proyecto : parseInt(this.formProyecto.value.id_proyecto),
      nombre_proyecto: this.proyecto.nombre
    }
    console.log(datos)
    this.subscription.add(this.postService.asignarJaulaProyecto(datos).subscribe(res => {
      console.log(res)
      if (res.status === 'Se asignó la jaula al proyecto'){
        this.alertM = true;
        this.estadoM = 'success';
        this.mensajeAlertM = 'Jaula asociada correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 2000);
      }
      } , err => {
        this.alertM = true;
        this.estadoM = 'danger';
        this.mensajeAlertM = JSON.stringify(err.error.error);
        setTimeout(() => {
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 2000);
    }))
    }, 500);
  }

  eliminarJaula(){
  this.subscription.add(this.postService.eliminarJaula(this.idJaula).subscribe(res =>{
      if (res.Status === 'Ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Jaula eliminada correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.router.navigate(['/home/bioterio']);
        }, 1000);
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert ='La jaula debe estar vacía para poder darla de baja';
      setTimeout(() => {
        this.modalService.dismissAll()
        this.ngOnInit()
      }, 2000);
    }))
  }
  Buscar(){
    this.fecDesde =  new Date(this.fecDesde.year,(this.fecDesde.month -1)  ,this.fecDesde.day)
    this.fecHastaReal =   new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    const diaMas1 = (this.fecHastaReal).getDate();
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogBuscadoJaula = {
      id_jaula: this.idJaula,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    console.log(blog)
    setTimeout(() => {
      this.subscription.add(this.postService.obtenerBlogJaula(blog).subscribe(res =>{
        this.blogs = res;
        console.log(res) }))
    }, 1000);
  }

  crearBlog(): void{
    const Blog: any={
      id_usuario: 1,
      detalle: this.detalleBlog,
      tipo: 'Jaula'
    }
    const nuevoBlog : BlogJaula={
      id_jaula: this.idJaula,
      blogs: Blog
    }
    console.log(nuevoBlog)
    this.postService.nuevoBlogJaula(nuevoBlog).subscribe(res => {
      if (res.Status === 'Ok'){
        this.alertM = true;
        this.estadoM = 'success';
        this.mensajeAlertM = 'Blog creado correctamente';
        setTimeout(() => {
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alertM = true;
      this.estadoM = 'danger';
      this.mensajeAlertM = JSON.stringify(err);
      console.log(err)
      setTimeout(() => {
        this.modalService.dismissAll()
        this.ngOnInit()
      }, 2000);
    });
  }

  eliminarAnimal(){
    this.subscription.add(this.postService.eliminarAnimal(this.id).subscribe(res =>{
      if (res.Status === "Se dio de baja el animal con id "+ this.id){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Animal eliminado correctamente';
        setTimeout(() => {
          this.animales = [];
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 1000);
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err);
      console.log(err)
    }))
  }
  eliminarModalAnimal(id:number,content){
    this.id= id;
    this.open(content)
  }
}

