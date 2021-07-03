import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogsBuscadosHerr } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-blog-herramientas',
  templateUrl: './blog-herramientas.component.html',
  styleUrls: ['./blog-herramientas.component.css']
})
export class BlogHerramientasComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  @Output() volviendo = new EventEmitter<number>();

  step : number;
  fecDesde:any;
  fecHastaReal:any;
  fecHasta
  fecHoy: any;
  blogs = [];
  idEspacioFisico:number;
  idHerramienta:number;
  herramienta:any;
  formFecha!:FormGroup;
  herr:any;
  
  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 9;
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.idHerramienta = parseInt(this.activatedRouter.snapshot.paramMap.get('idHerramienta'), 10);
    this.getService.obtenerHerramienta(this.idHerramienta).subscribe(res => {
      this.herramienta = res;
      console.log(res)
    })
    this.fecHoy = new Date(Date.now());
    const dia = (this.fecHoy).getDate() + 1;

    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    console.log(this.fecHasta)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogsBuscadosHerr = {
          id_herramienta: this.idHerramienta,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    console.log(blog)
    this.subscription.add(this.postService.obtenerBlogHerramientas(blog).subscribe(res =>{
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
      console.log(this.fecHastaReal)
      const diaMas1 = (this.fecHastaReal).getDate() + 2;
      this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
      this.fecDesde = this.fecDesde.toDateString();
      this.fecHasta = this.fecHasta.toDateString();
      console.log(this.fecHasta)
      const blog : BlogsBuscadosHerr = {
        id_herramienta: this.idHerramienta,
        fechaDesde: this.fecDesde,
        fechaHasta: this.fecHasta
      }
      this.subscription.add(this.postService.obtenerBlogHerramientas(blog).subscribe(res =>{
        console.log(res);
        this.blogs = res; })
      );
      
    }
  nuevoBlog(){
    this.herr =  this.idHerramienta;
    this.step = 10;
  }
  volver(): void{
    this.volviendo.emit(6);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }
}
