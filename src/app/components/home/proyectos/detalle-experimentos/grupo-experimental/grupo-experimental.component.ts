import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  formFuenteExperimental: FormGroup;
  formMuestra: FormGroup;
  contenedores = [];
  active = 1;

  constructor(
    private activatedRouter: ActivatedRoute,
    private postService: PostService,
    private getService: GetService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.idGrupo = parseInt(this.activatedRouter.snapshot.paramMap.get('idGrupo'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.getService.obtenerGruposExperimentalesPorId(this.idGrupo).subscribe(res => {
      console.log(res);
      this.grupoExperimental = res;
      console.log(this.grupoExperimental)
      if (this.grupoExperimental.tipo){

      }
    });
    this.getService.obtenerContenedoresPorProyecto(this.idProyecto).subscribe(res => {
      console.log(res);
      this.contenedores = res;
    })
    this.formFuenteExperimental = new FormGroup({
      tipo: new FormControl(''),
      codigo: new FormControl(''),
      animal: new FormControl(''),
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
  }

  open(content): void {
    console.log(this.animalesProyecto)
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  crearFuente(): void{
    const animal = this.animalesProyecto.filter(animal=> animal.id_fuenteExperimental == this.formFuenteExperimental.value.animal)[0];
    const obj = {
      id_experimento: this.idExperimento,
      parent: 0,
      tipo: this.grupoExperimental.tipo,
      id_grupoExperimental: this.idGrupo,
      codigo: this.grupoExperimental.codigo,
      fuentesExperimentales: [
        {
          codigoGrupoExperimental : this.grupoExperimental.codigo,
          codigo : this.formFuenteExperimental.value.codigo,
          cepa: animal.cepa,
          id_fuenteExperimental: animal.id_fuenteExperimental,
          descripcion: this.formFuenteExperimental.value.descripcion,
          especie: animal.especie,
          sexo: animal.sexo,
          tipo: this.grupoExperimental.tipo,
          id_jaula: animal.id_jaula
        }
      ]
    }
    console.log(obj);
    this.postService.crearFuenteExperimental(obj).subscribe(res => {
      console.log(res);
    })
  }


  crearMuestra(): void{
    const obj = {
      id_proyecto : this.idProyecto,
      id_experimento : this.idExperimento,
      id_grupoExperimental : this.idGrupo,
      codigo : this.formMuestra.value.codigo,
      descripcion : this.formMuestra.value.descripcion,
      tipo : this.grupoExperimental.tipo,
      id_contenedor : this.formMuestra.value.contenedor
    }
    this.postService.crearMuestra([obj]).subscribe(res => {
      console.log(res)
      setTimeout(() => {
        this.ngOnInit()
      }, 500);
    })
  } 

}