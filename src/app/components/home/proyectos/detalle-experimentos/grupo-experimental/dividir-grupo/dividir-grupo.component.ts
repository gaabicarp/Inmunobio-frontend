import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  fuentesExperimentales =[]
  formGrupo:FormGroup;

  idGrupo:number;
  idExperimento:number;
  idProyecto:number;
  grupoExperimental:any;
  disabledForm: boolean;

  itemList: any = [];
  selectedItems = [];
  settings:any;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private postService: PostService,
    private getService: GetService,
    public toastService: ToastServiceService
    ) {}

  ngOnInit(): void {
    this.idGrupo = parseInt(this.activatedRouter.snapshot.paramMap.get('idGrupo'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    
    this.getService.obtenerGruposExperimentalesPorId(this.idGrupo).subscribe(res => {
      console.log(res);
      this.grupoExperimental = res;
      this.itemList = this.grupoExperimental.fuentesExperimentales
    });
    this.formGrupo = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fuentes: new FormControl([],  ),
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
  dividirGrupo(){
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
      id_experimento: this.idExperimento,
      habilitado : 'true',
      muestras : [],
      fuentesExperimentales: this.formGrupo.value.fuentes,
      parent: this.grupoExperimental.id_grupoExperimental,
      tipo:this.grupoExperimental.tipo
    }
    console.log(NuevoGrupo)
    this.postService.dividirGrupoExperimental([NuevoGrupo]).subscribe(res =>{
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
