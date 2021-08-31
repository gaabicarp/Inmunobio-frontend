import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogsJaula } from 'src/app/models/blogs.model';
import { Jaula } from 'src/app/models/jaula.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-bioterio',
  templateUrl: './bioterio.component.html',
  styleUrls: ['./bioterio.component.css']
})
export class BioterioComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  jaulas:Jaula[];
  cargando: boolean;
  filterPost: string;

  fecHoy = new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  blogs:BlogsJaula[];

  constructor(
    private getService: GetService,
    private postService: PostService,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.filterPost = '';
    this.subscription.add(this.getService.obtenerJaulas().subscribe(res => {
      console.log(res);
      if(res){
      this.jaulas = res;
      this.cargando = false;
      } else {
        this.jaulas = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    }));
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : any = {
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        }
    this.subscription.add(this.postService.obtenerTodosBlogsJaulas(blog).subscribe(res => {
      console.log(res)
      if(res){
        this.blogs = res;
      } else{
        this.blogs=[]
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    }));
  }

  Buscar(){
    this.fecDesde =  new Date(this.fecDesde.year,(this.fecDesde.month -1)  ,this.fecDesde.day)
    const fechaHasta = new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    console.log(this.fecDesde, fechaHasta)
    const diaMas1 = (fechaHasta).getDate() + 2;
    this.fecHasta = new Date(fechaHasta.getFullYear(),fechaHasta.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : any = {
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    console.log(blog)
    this.subscription.add( this.postService.obtenerTodosBlogsJaulas(blog).subscribe(res =>{
      console.log(res)
      if(res){
        this.blogs = res;
      } else{
        this.blogs=[]
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      } }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
