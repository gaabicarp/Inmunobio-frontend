import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogBuscadoJaula } from 'src/app/models/blogs.model';
import { Jaula } from 'src/app/models/jaula.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-jaula-detalle',
  templateUrl: './jaula-detalle.component.html',
  styleUrls: ['./jaula-detalle.component.css']
})
export class JaulaDetalleComponent implements OnInit {
  @Input() element!: any;
  @Output() volviendo = new EventEmitter<number>();
  
  animales = [];
  espacios = [];
  blogs=[];
  proyectos=[];
  proyecto: any;
  jaula:Jaula;
  id:number;
  step:number;
  fecHoy:any;
  fecDesde:any;
  fecHasta:any;
  fecHastaReal:any;
  formFecha!:FormGroup;
  formProyecto!:FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;


  constructor(private getService: GetService, private postService : PostService) { }

  ngOnInit(): void {
    this.step = 2; 
    console.log(this.element)
    this.getService.obtenerJaulasPorId(this.element).subscribe(res => {
      console.log(res);
      this.jaula = res;
    })
    this.getService.obtenerAnimalesPorJaula(this.element).subscribe(res => {
      if(!res.Status){
        this.animales = res;
      }
    })
    this.getService.obtenerEspaciosFisicos().subscribe(res => {
      if(!res.Status){
        this.espacios = res;
      }
    })
    this.getService.obtenerProyectos().subscribe(res => {
      this.proyectos = res.filter(proyecto => !proyecto.finalizado );
      console.log(res)
    });
    this.fecHoy = new Date(Date.now());
    const dia = (this.fecHoy).getDate() + 1;

    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    console.log(this.fecHasta)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogBuscadoJaula = {
          id_jaula: this.element,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    console.log(blog)
    this.postService.obtenerBlogJaula(blog).subscribe(res =>{
      console.log(res);
      this.blogs = res; });
    this.formFecha = new FormGroup({
      fecDesde: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)])
    })
    this.formProyecto = new FormGroup({
      id_proyecto : new FormControl('', [Validators.required, ]) })
  }

  altaAnimal(){
    this.id = this.element;
    this.step = 3;
  }

  eliminar(id_animal: number){
    this.postService.eliminarAnimal(id_animal).subscribe(res =>{
      console.log(res);
    })
  }
  Buscar(){
    this.fecDesde = new Date(this.formFecha.value.fecDesde);
    this.fecHastaReal= new Date(this.formFecha.value.fecHasta);
    console.log(this.fecHastaReal)
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    console.log(this.fecHasta)
    const blog : BlogBuscadoJaula = {
      id_jaula: this.element,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    this.postService.obtenerBlogJaula(blog).subscribe(res =>{
      console.log(res);
      this.blogs = res; })
  }
  nuevoBlog(){
    this.id =  this.element;
    this.step = 4;
  }
  eliminarJaula(){
    this.postService.eliminarJaula(this.element).subscribe(res =>{
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Jaula eliminada correctamente';
        setTimeout(() => {
          this.volviendo.emit(3);
        }, 2000);
      }
      console.log(res)
    }, err => {
    this.alert = true;
    this.estado = 'danger';
    this.mensajeAlert = JSON.stringify(err.error.error);
    })
  }
  asociarProyecto(){
    this.step = 5;
  }
  asociar(){
      const datos: any = {
        id_jaula : this.element,
        id_proyecto : parseInt(this.formProyecto.value.id_proyecto),
        nombre_proyecto: this.proyectos[this.formProyecto.value.id_proyecto -1]?.nombre
      }
      console.log(datos)
      this.postService.asignarJaulaProyecto(datos).subscribe(res => {
        console.log(res)
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'Jaula asociada correctamente';
        }
        } , err => {
          this.alert = true;
          this.estado = 'danger';
          this.mensajeAlert = JSON.stringify(err.error.error);
      })
    }
  
  volver(): void{
    this.volviendo.emit(0);
  }
  volverDetalle(){
    this.step = 2
  }
  onVolviendo(e: number): void{
    this.step = e;
  }
}
