import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuscarBlogJaula, Jaula, TodosBlogsJaulas } from 'src/app/models/jaula.model';
import { EspacioFisico } from 'src/app/models/espacioFisico.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bioterio',
  templateUrl: './bioterio.component.html',
  styleUrls: ['./bioterio.component.css']
})
export class BioterioComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  @Output() volviendo = new EventEmitter<number>();
  jaulas: Jaula;
  espacios: EspacioFisico;
  blogs: TodosBlogsJaulas;
  step : number;
  
  fecHoy = new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  fecHastaReal:any;
  
  formFecha!: FormGroup;
  alert :any;
  estado:any;
  mensajeAlert:any;
  modo: string;
  jaulaSeleccionada: any;

  filterPost: string;
  
  constructor(private getService: GetService,private postService: PostService) { }

  ngOnInit(): void {
    this.alert = false;
    this.filterPost = '';
    this.step = 0;
    this.subscription.add( this.getService.obtenerJaulas().subscribe(res => {
      console.log(res)
      this.jaulas = res;             
    }))
    this.subscription.add(this.getService.obtenerEspaciosFisicos().subscribe(res => {
      console.log(res)
      this.espacios = res;
    }))
    
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BuscarBlogJaula = {
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    this.subscription.add(this.postService.obtenerTodosBlogsJaulas(blog).subscribe(res =>{
      console.log(res)
      this.blogs = res; 
    }))
    this.formFecha = new FormGroup({
      fecDesde: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)])
    })
  }
  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }
  // eliminar(id: number){
  //   this.subscription.add(this.postService.eliminarJaula(id).subscribe(res =>{
  //     if (res.Status === 'ok'){
  //       this.alert = true;
  //       this.estado = 'success';
  //       this.mensajeAlert = 'Jaula eliminada correctamente';
  //       this.step = 0;
  //     }
  //     console.log(res)
  //   }, err => {
  //     this.alert = true;
  //     this.estado = 'danger';
  //     this.mensajeAlert = JSON.stringify(err.error.Status);
  //     console.log(err)
  //   }))
  // }
  Buscar(){
    this.fecDesde = new Date(this.formFecha.value.fecDesde);
    this.fecHastaReal= new Date(this.formFecha.value.fecHasta);
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BuscarBlogJaula = {
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    this.subscription.add(this.postService.obtenerTodosBlogsJaulas(blog).subscribe(res =>{
      console.log(res)
      this.blogs = res; }))
  }
  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}