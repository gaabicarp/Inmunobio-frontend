import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogBuscadoExperimento } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-detalle-experimentos',
  templateUrl: './detalle-experimentos.component.html',
  styleUrls: ['./detalle-experimentos.component.css']
})
export class DetalleExperimentosComponent implements OnInit {
  
  idProyecto!: number;
  idExperimento!: number;
  proyecto: any;
  experimento: any;
  gruposExperimentales = [];
  formGrupoExperimental: FormGroup;
  agregarGrupo: boolean;
  step:number;
  modo:string;
  fecHoy=new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  fecHastaReal:any;
  formFecha!:FormGroup;
  blogs:any;
  
  constructor(private activatedRouter: ActivatedRoute, private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.step = 0;
    this.agregarGrupo = false;
    this.formGrupoExperimental = new FormGroup({
      tipo: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
    });
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.getService.obtenerProyectosPorId(this.idProyecto).subscribe(res => {
      console.log(res);
      this.proyecto = res;
    });
    this.getService.obtenerExperimentoPorId(this.idExperimento).subscribe(res => {
      console.log(res);
      this.experimento = res;
    });
    this.getService.obtenerGruposExperimentalesPorExperimento(this.idExperimento).subscribe(res => {
      console.log(res);
      res === null ? this.gruposExperimentales = [] : this.gruposExperimentales = res;
    });
    const dia = (this.fecHoy).getDate() + 1;
    this.fecHasta = new Date(this.fecHoy.getFullYear(),this.fecHoy.getMonth(), dia)
    console.log(this.fecHasta)
    this.fecHasta = this.fecHasta.toDateString();
    const blog : BlogBuscadoExperimento = {
          id_experimento: this.idExperimento,
          fechaDesde: 'Mon May 31 2021',
          fechaHasta: this.fecHasta
        } 
    console.log(blog)
    this.postService.obtenerBlogsExperimento(blog).subscribe(res =>{
      console.log(res)
      if(!res.Status){
        this.blogs = res;
      }
    })
    this.formFecha = new FormGroup({
      fecDesde: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fecHasta: new FormControl('', [Validators.required, Validators.maxLength(20)])
    })
  }

  crearGrupoExperimental(): void {
    let grupoExperimental = this.formGrupoExperimental.value;
    grupoExperimental.id_experimento = this.idExperimento;
    this.postService.crearGrupoExperimental(grupoExperimental).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.ngOnInit()
      }, 500);
    })
  }
  editarExp(){
    this.experimento = this.experimento;
    this.modo = 'EDITAR';
    this.step = 1;
  }
  Buscar(){
    this.fecDesde = new Date(this.formFecha.value.fecDesde);
    this.fecHastaReal= new Date(this.formFecha.value.fecHasta);
    const diaMas1 = (this.fecHastaReal).getDate() + 2;
    this.fecHasta = new Date(this.fecHastaReal.getFullYear(),this.fecHastaReal.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    console.log(this.fecHasta)
    const blog : BlogBuscadoExperimento = {
      id_experimento: this.idExperimento,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    this.postService.obtenerBlogsExperimento(blog).subscribe(res =>{
      this.blogs = res; })
  }

}
