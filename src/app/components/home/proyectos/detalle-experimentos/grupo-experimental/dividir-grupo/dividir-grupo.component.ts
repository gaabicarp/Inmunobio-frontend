import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-dividir-grupo',
  templateUrl: './dividir-grupo.component.html',
  styleUrls: ['./dividir-grupo.component.css']
})
export class DividirGrupoComponent implements OnInit {
  codigoNuevoGrupo:string;
  nuevosGrupos :any  =[]
  formGrupo:FormGroup;

  idGrupo:number;
  idExperimento:number;
  idProyecto:number;
  grupoExperimental:any;
  disabledForm: boolean;
  cargando:boolean;

  itemList: any = [];
  selectedItems = [];
  settings:any;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private postService: PostService,
    private getService: GetService,
    private modalService: NgbModal,
    public toastService: ToastServiceService
    ) {}

  ngOnInit(): void {
    this.cargando = true;
    this.idGrupo = parseInt(this.activatedRouter.snapshot.paramMap.get('idGrupo'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    
    this.getService.obtenerGruposExperimentalesPorId(this.idGrupo).subscribe(res => {
      if (res){
        this.grupoExperimental = res;
        this.itemList = this.grupoExperimental.fuentesExperimentales  
        this.cargando = false;
      } else {
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res);
    });
    this.formGrupo = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      fuentes: new FormControl([],[Validators.required] ),
    });
    this.settings = {
      text: 'Seleccione fuentes experimentales',
      selectAllText: 'Seleccione Todos',
      unSelectAllText: 'Quitar Todos',
      classes: 'myclass custom-class',
      primaryKey: 'id_fuenteExperimental',
      labelKey: 'codigo',
      enableSearchFilter: true,
      searchBy: ['codigo'],
      disabled: false,
    };
  }
  open(content): void {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  guardarGrupo(){
    this.disabledForm = true;
    this.settings = {
      text: 'Seleccione fuentes experimentales',
      selectAllText: 'Seleccione Todos',
      unSelectAllText: 'Quitar Todos',
      classes: 'myclass custom-class',
      primaryKey: 'id_fuenteExperimental',
      labelKey: 'codigo',
      enableSearchFilter: true,
      searchBy: ['codigo'],
      disabled: true,
    };
    const NuevoGrupo:any ={
      codigo: this.formGrupo.value.codigo,
      descripcion: this.formGrupo.value.descripcion,
      id_experimento: this.idExperimento,
      habilitado : 'true',
      muestras : [],
      fuentesExperimentales: this.formGrupo.value.fuentes,
      parent: this.grupoExperimental.id_grupoExperimental,
      tipo:this.grupoExperimental.tipo
    }
      this.nuevosGrupos.push(NuevoGrupo)
      const fuentesSeleccionadas = this.formGrupo.value.fuentes
      console.log(this.nuevosGrupos)
      this.itemList = this.itemList.filter( fuente => { return !fuentesSeleccionadas.includes(fuente) })
      console.log(this.itemList)
      this.toastService.show('Grupo Experimental agregado', { classname: 'bg-success text-light', delay: 2000 });
      setTimeout(() => {
        this.settings = {
          text: 'Seleccione fuentes experimentales',
          selectAllText: 'Seleccione Todos',
          unSelectAllText: 'Quitar Todos',
          classes: 'myclass custom-class',
          primaryKey: 'id_fuenteExperimental',
          labelKey: 'codigo',
          enableSearchFilter: true,
          searchBy: ['codigo'],
          disabled: false,
        };
        this.formGrupo = new FormGroup({
          codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
          descripcion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
          fuentes: new FormControl([],  ),
        });
          this.selectedItems = [];
          this.toastService.removeAll()
          this.modalService.dismissAll()
          this.disabledForm = false;
      }, 1000);
  }
  dividirGrupo(){
    this.disabledForm = true;
    this.postService.dividirGrupoExperimental(this.nuevosGrupos).subscribe(res =>{
      console.log(res)

      if (res.Status){
        this.toastService.show('Grupo Experimental dividido', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.disabledForm = false;
          this.router.navigate(['/home/proyectos/'+ this.idProyecto +'/experimento/'+this.idExperimento]);
        }, 1000);
      }
    }, err => {
      this.toastService.show('Problema al dividir el grupo experimental'+err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      setTimeout(() => {
        this.toastService.removeAll()
        this.disabledForm = false;
      }, 3000);

    })
  }
}
