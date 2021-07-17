import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BlogsJaula } from 'src/app/models/blogs.model';
import { Jaula } from 'src/app/models/jaula.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-bioterio',
  templateUrl: './bioterio.component.html',
  styleUrls: ['./bioterio.component.css']
})
export class BioterioComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  jaulas:Jaula;
  cargando: boolean;
  filterPost: string;

  fecHoy = new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  fecHastaReal:any;
  blogs:BlogsJaula;
  detalleBlog:string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.filterPost = '';
    this.getService.obtenerJaulas().subscribe(res => {
      console.log(res);
      this.jaulas = res;
      this.cargando = false;
    });
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : any = {
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        }
    this.postService.obtenerTodosBlogsJaulas(blog).subscribe(res => {
      console.log(res)
      this.blogs = res;
    })
  }
  open(content): void {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  Buscar(){
    this.fecDesde =  new Date(this.fecDesde.year,(this.fecDesde.month -1)  ,this.fecDesde.day)
    this.fecHastaReal =   new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    console.log(this.fecDesde, this.fecHastaReal)
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : any = {
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    console.log(blog)
    this.subscription.add(this.postService.obtenerTodosBlogsJaulas(blog).subscribe(res =>{
      console.log(res)
      this.blogs = res; }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
