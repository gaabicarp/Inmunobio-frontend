import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Herramienta } from 'src/app/models/herramientas.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nueva-herramienta',
  templateUrl: './nueva-herramienta.component.html',
  styleUrls: ['./nueva-herramienta.component.css']
})
export class NuevaHerramientaComponent implements OnInit {

  formHerramienta!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  idEspacioFisico:number;
  idHerramienta:number;
  herramienta:any;
  editar=false ;

  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.idHerramienta = parseInt(this.activatedRouter.snapshot.paramMap.get('idHerramienta'), 10);
    this.alert = false;
    if (!isNaN(this.idHerramienta)){
      this.getService.obtenerHerramienta(this.idHerramienta).subscribe(res =>{
        this.herramienta = res;
        console.log(res)
      })
      this.editar =true;
    }
    this.formHerramienta = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      detalle: new FormControl('', [Validators.maxLength(100)])
    });
    setTimeout(() => {
      if (!isNaN(this.idHerramienta)) {
        this.formHerramienta.patchValue({
          nombre: this.herramienta.nombre,
          detalle: this.herramienta.detalle
        });
      }
    }, 500);
  }
  nuevaHerramienta(){
    const herramienta : Herramienta = {
      nombre: this.formHerramienta.value.nombre,
      detalle: this.formHerramienta.value.detalle,
      id_espacioFisico: this.idEspacioFisico
    };
    if (!isNaN(this.idHerramienta) ){
      herramienta.id_espacioFisico  = this.idEspacioFisico;
      herramienta.id_herramienta = this.idHerramienta;
      this.postService.editarHerramienta(herramienta).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'La información fue editada correctamente';
        }
        console.log(res);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      this.postService.crearHerramienta(herramienta).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'Herramienta creada correctamente';
        }
        console.log(res);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }

}
