import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { BlogBuscadoJaula, BlogBuscadoProyecto } from 'src/app/models/blogs.model';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css'],
  providers: [DecimalPipe]
})
export class DetalleProyectoComponent implements OnInit {

  experimentos = [];
  experimentoFiltro = [];
  filter = new FormControl('');
  model: NgbDateStruct;
  proyecto: any;
  jefeProyecto: any;
  usuariosProyecto = [];
  idProyecto: number;
  fecHoy = new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  fecHastaReal:any;
  formFecha!: FormGroup;
  blogs =[];
  blogsSinFiltro =[];
  filtrados =[];
  
  constructor(private router: Router, private postService: PostService,private getService: GetService, private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.getService.obtenerProyectosPorId(this.idProyecto).subscribe(res => {
      console.log(res)
      this.proyecto = res;
      this.traerDirector(res.idDirectorProyecto);
      this.traerUsuarios(res.participantes);
    });
    this.getService.obtenerExperimentos(this.idProyecto).subscribe(res => {
      console.log(res);
      this.experimentos = res;
      this.experimentoFiltro = res;
    });
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogBuscadoProyecto = {
          id_proyecto: this.idProyecto,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    this.postService.obtenerBlogsProyecto(blog).subscribe(res =>{
      console.log(res)
      this.blogs = res; 
    })
    this.formFecha = new FormGroup({
      fecDesde: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      filtro: new FormControl()
    })
  }

  traerDirector(id: number): void {
    this.getService.obtenerUsuariosPorId(id).subscribe(res => {
      this.jefeProyecto = res;
    });
  }

  traerUsuarios(usuarios: Array<number>): void {
    this.proyecto.participantes.map(id => {
      this.getService.obtenerUsuariosPorId(id).subscribe(res => {
        this.usuariosProyecto.push(res);
      });
    });
  }

  irA(id: number): void {
    this.router.navigateByUrl(`experimento/${id}`);
  }

  onFilter(filter: string): void {
    this.experimentoFiltro = this.experimentos.filter(res => {
      return res.objetivos === filter;
    });
  }

  Buscar(){
    this.fecDesde = new Date(this.formFecha.value.fecDesde);
    this.fecHastaReal= new Date(this.formFecha.value.fecHasta);
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogBuscadoProyecto = {
      id_proyecto : this.idProyecto,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    this.postService.obtenerBlogsProyecto(blog).subscribe(res =>{
      console.log(res)
      this.blogs = res; })
    if (this.formFecha.value.filtro == 'Jaula'){
      var filtrados= this.blogs.filter(blog => blog.tipo === 'Jaula')
      setTimeout(() => {
        this.blogs=filtrados;
        console.log(this.blogs)
      }, 1000);
    } else if (this.formFecha.value.filtro == 'Experimento'){
      var filtrados= this.blogs.filter(blog => blog.tipo === 'Experimento')
      setTimeout(() => {
        this.blogs=filtrados;
        console.log(this.blogs)
      }, 1000);
    }
  }


}
