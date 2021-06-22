import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BlogsBuscados } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blogs-espacio-fisico',
  templateUrl: './blogs-espacio-fisico.component.html',
  styleUrls: ['./blogs-espacio-fisico.component.css']
})
export class BlogsEspacioFisicoComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Input() espacio!: any;
  @Output() volviendo = new EventEmitter<number>();

  step : number;
  fecDesde:any;
  fecHastaReal:any;
  fecHasta
  fecHoy: any;
  blogs = [];
  formFecha!:FormGroup;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 5;
    console.log(this.espacio)

    this.fecHoy = new Date(Date.now());
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogsBuscados = {
          id_espacioFisico: this.espacio,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    console.log(blog)

    this.subscription.add(this.postService.obtenerBlogEspacioFisico(blog).subscribe(res =>{
      console.log(res);
      this.blogs = res; })
    );

    this.formFecha = new FormGroup({
      fecDesde: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)])
    })
  }
  Buscar(){
    this.fecDesde = new Date(this.formFecha.value.fecDesde);
    this.fecHastaReal= new Date(this.formFecha.value.fecHasta);
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogsBuscados = {
      id_espacioFisico: this.espacio,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    this.subscription.add(this.postService.obtenerBlogEspacioFisico(blog).subscribe(res =>{
      console.log(res);
      this.blogs = res; })
    );
    
  }
  nuevoBlog(){
    this.espacio = this.espacio; 
    this.step = 6;
  }
  eliminar(id_blogParametro:number){
    const id_espacioFisico= this.espacio;
    const id_blog = id_blogParametro;
    this.postService.eliminarBlogEspacioFisico(id_espacioFisico, id_blog).subscribe(res =>{
      console.log(res);
    })

  }
  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }
  

}
