import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { Fuente } from 'src/app/models/fuente.model'

@Component({
  selector: 'app-grupo-experimental',
  templateUrl: './grupo-experimental.component.html',
  styleUrls: ['./grupo-experimental.component.css']
})
export class GrupoExperimentalComponent implements OnInit {
  idGrupo: number;
  idExperimento: number;
  idProyecto: number;
  grupoExperimental: any;
  animalesProyecto = [];
  formFuenteExperimentalAnimal: FormGroup;
  formFuenteExperimentalOtro: FormGroup;
  formMuestra: FormGroup;
  contenedores = [];
  active = 1;
  muestras:any;
  muestrasFiltradas:any;
  animal:any;
  fuente:Fuente;
  fuenteOtro:any;
  contenedoresProyecto: any;
  contenedoress:any;

  codigo:any;
  descripcion:any;
  codigoGrupoExperimental:any; 

  jaulasProy:any;
  idJaulas:any;
  animales:any;

  idFuente:number;
  constructor(
    private activatedRouter: ActivatedRoute,
    private postService: PostService,
    private getService: GetService,
    private modalService: NgbModal,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.idGrupo = parseInt(this.activatedRouter.snapshot.paramMap.get('idGrupo'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.getService.obtenerGruposExperimentalesPorId(this.idGrupo).subscribe(res => {
      console.log(res);
      this.grupoExperimental = res;
    });
    this.getService.obtenerContenedoresPorProyecto(this.idProyecto).subscribe(res => {
      console.log(res);
      this.contenedores = res;
    })
    this.formFuenteExperimentalAnimal = new FormGroup({
      tipo: new FormControl(''),
      codigo: new FormControl(''),
      animal: new FormControl(''),
      descripcion: new FormControl('')
    });
    this.formFuenteExperimentalOtro = new FormGroup({
      tipo: new FormControl(''),
      codigo: new FormControl(''),
      descripcion: new FormControl('')
    });
    this.formMuestra = new FormGroup({
      codigo: new FormControl(''),
      descripcion: new FormControl(''),
      contenedor: new FormControl('')
    });
    this.getService.obtenerAnimalesPorProyectos(this.idProyecto).subscribe(res => {
      console.log(res);
      res.Status ? this.animalesProyecto = [] : this.animalesProyecto = res;
    });
    this.getService.obtenerJaulasPorProyecto(this.idProyecto).subscribe( res =>{
      console.log(res)
      this.jaulasProy = res
    })
    setTimeout(() => {
      this.getService.obtenerAnimalesPorJaula(this.jaulasProy[0].id_jaula).subscribe(res =>{
        this.animales = res
        console.log(res)
      })
    }, 500);
  }

  open(content): void {
    console.log(this.animalesProyecto)
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  crearFuenteAnimal(): void{
      const idAnimal = this.formFuenteExperimentalAnimal.value.animal
      this.getService.obtenerAnimalxId(idAnimal).subscribe( res =>{
        this.animal = res;
        // console.log(res)
      })
      setTimeout(() => {
      this.fuente={
        id_fuenteExperimental: this.animal.id_fuenteExperimental,
        id_proyecto: this.animal.id_proyecto,
        codigo: this.formFuenteExperimentalAnimal.value.codigo,
        codigoGrupoExperimental: this.grupoExperimental.codigo,
        especie: this.animal.especie,
        sexo: this.animal.sexo,
        cepa: this.animal.cepa,
        tipo : this.animal.tipo,
        id_jaula: this.animal.id_jaula,
        baja: this.animal.baja,
        descripcion: this.formFuenteExperimentalAnimal.value.descripcion
      }
      const fuenteExperimental ={
        id_grupoExperimental : this.idGrupo,
        id_experimento: this.idExperimento,
        tipo: this.grupoExperimental.tipo,
        codigo: this.grupoExperimental.codigo,
        parent:0,
        fuentesExperimentales : [this.fuente]
      }
      console.log(fuenteExperimental)
      this.postService.crearFuenteExperimental(fuenteExperimental).subscribe(res => {
        console.log(res)
        if (res.Status === 'Se crearon las fuentes experimentales') {
          this.toastService.show('Fuente Experimental creada', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
            this.modalService.dismissAll()
            this.ngOnInit()
          }, 2000);
        }
      }, err => {
        if(err.error.Error == "Los animales ya están en uso."){
          this.toastService.show('Error - el animal ya está en uso', { classname: 'bg-danger text-light', delay: 2000 });
        } else{
          this.toastService.show('Error '+ err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
        }
        console.log(err)
      })
    }, 1000);
  }
  crearFuenteOtro(){
      setTimeout(() => {
      this.fuenteOtro={
        codigo: this.formFuenteExperimentalOtro.value.codigo,
        codigoGrupoExperimental: this.grupoExperimental.codigo,
        tipo : 'Otro',
        descripcion: this.formFuenteExperimentalOtro.value.descripcion
      }
      const fuenteExperimental ={
        id_grupoExperimental : this.idGrupo,
        id_experimento: this.idExperimento,
        tipo: this.grupoExperimental.tipo,
        codigo: this.grupoExperimental.codigo,
        parent:0,
        fuentesExperimentales : [this.fuenteOtro]
      }
      this.postService.crearFuenteExperimental(fuenteExperimental).subscribe(res => {
        console.log(res)
        if (res.Status === 'Se crearon las fuentes experimentales') {
          this.toastService.show('Fuente Experimental creada', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
            this.modalService.dismissAll()
            this.ngOnInit()
          }, 2000);
        }
      }, err => {
        this.toastService.show('Problema al crear la fuente experimental' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
      })
    }, 1000);

  }


  crearMuestra(): void{
    const obj = {
      id_proyecto : this.idProyecto,
      id_experimento : this.idExperimento,
      id_grupoExperimental : this.idGrupo,
      codigo : this.formMuestra.value.codigo,
      descripcion : this.formMuestra.value.descripcion,
      tipo : this.grupoExperimental.tipo,
      id_contenedor : parseInt(this.formMuestra.value.contenedor),
      id_fuenteExperimental: this.idFuente
    }
    console.log([obj])
    this.postService.crearMuestra([obj]).subscribe(res => {
      if (res.Status === 'Muestra creada'){
        this.toastService.show('Muestra creada', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.ngOnInit()
        }, 2000);
      }
      console.log(res);
    }, err => {
      this.toastService.show('Problema crear la muestra ' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
    })
  } 
  fuenteExpDetalle(idFuente, content){
    this.open(content)
    console.log(idFuente)
    this.idFuente = idFuente;
    this.getService.obtenerMuestrasPorIdFuente(idFuente).subscribe( res =>{
      this.muestrasFiltradas = res;
      console.log(res)
    })
    this.getService.obtenerFuenteExperimental(this.idFuente).subscribe(res =>{
      console.log(res)
    })
  }

}