import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { EspacioFisico } from 'src/app/models/espacioFisico.model';
import { BlogJaula, BuscarBlogJaula, Jaula } from 'src/app/models/jaula.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-jaula-detalle',
  templateUrl: './jaula-detalle.component.html',
  styleUrls: ['./jaula-detalle.component.css']
})
export class JaulaDetalleComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  @Output() volviendo = new EventEmitter<number>();
  idJaula:number;
  animales = [];
  espacios=[];
  blogs: BlogJaula;
  jaula: Jaula;
  proyectos=[];
  proyecto: any;
  id:number;
  step:number;
  fecHoy=new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  fecHastaReal:any;
  formFecha!:FormGroup;
  formProyecto!:FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  espacioFisico:any;
  miProyecto:any;

  constructor(private router: Router, private postService: PostService,private getService: GetService, private activatedRouter: ActivatedRoute) { }

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
    // this.subscription.add(this.getService.obtenerEspaciosFisicos().subscribe(res => {
    //   console.log(res)
    //     this.espacios = res;
    // }))
    this.subscription.add(this.getService.obtenerProyectos().subscribe(res => {
      this.proyectos = res.filter(proyecto => !proyecto.finalizado );
      console.log(res)
    }))
    //MEJORAR
    setTimeout(() => {
      this.miProyecto = this.proyectos.find(proyecto => proyecto.id_proyecto === this.jaula.id_proyecto)
      console.log(this.miProyecto)
    }, 500);
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    console.log(this.fecHasta)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BuscarBlogJaula = {
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
    // setTimeout( () => {
    //   this.espacioFisico = this.espacios.find(espacio => espacio.id_espacioFisico === this.jaula.id_espacioFisico)
    // },500)
  }

  eliminar(id_animal: number){
    this.subscription.add(this.postService.eliminarAnimal(id_animal).subscribe(res =>{
      if (res.Status === 'Se dio de baja el animal con id '+ id_animal ){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Animal eliminado correctamente';
        setTimeout(() => {
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

  Buscar(){
    this.fecDesde = new Date(this.formFecha.value.fecDesde);
    this.fecHastaReal= new Date(this.formFecha.value.fecHasta);
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    console.log(this.fecHasta)
    const blog : BuscarBlogJaula = {
      id_jaula: this.idJaula,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    console.log(blog)
    this.subscription.add(this.postService.obtenerBlogJaula(blog).subscribe(res =>{
      this.blogs = res; }))
  }
  eliminarJaula(){
    this.subscription.add(this.postService.eliminarJaula(this.idJaula).subscribe(res =>{
      if (res.Status === 'Ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Jaula eliminada correctamente';
        setTimeout(() => {
          this.router.navigate(['/home/bioterio']);
        }, 1000);
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert ='La jaula debe estar vacía para poder darla de baja';
      setTimeout(() => {
        this.ngOnInit()
      }, 2000);
    }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
