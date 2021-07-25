import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['./nuevo-espacio.component.css']
})
export class NuevoEspacioComponent implements OnInit {
  formEspacio!: FormGroup;
  mensajeAlert: string;
  estado: string;
  alert: boolean;
  idEspacio:number;
  espacio:any;

  constructor(private getService: GetService,private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.alert = false;
    this.idEspacio = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    if (!isNaN(this.idEspacio)){
      this.getService.obtenerEspacioFisico(this.idEspacio).subscribe(res => {
        this.espacio=res;
      })
      }
    this.formEspacio = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      piso: new FormControl('', [Validators.maxLength(50)]),
      sala: new FormControl('', [Validators.maxLength(50)]),
      descripcion: new FormControl('', [Validators.maxLength(100)])
    });
    setTimeout(() => {
      if (!isNaN(this.idEspacio)){
        this.formEspacio.patchValue({
          nombre: this.espacio.nombre,
          piso: this.espacio.piso,
          sala: this.espacio.sala,
          descripcion: this.espacio.descripcion
        });
      }
    }, 500);
    
  }

  crearEspacio(): void {
    const espacioFisico = this.formEspacio.value;
    if (isNaN(this.idEspacio)){
      this.postService.crearEspacio(espacioFisico).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El espacio fue creado correctamente';
        }
        console.log(res)
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      espacioFisico.id_espacioFisico = this.espacio.id_espacioFisico;
      this.postService.editarEspacio(espacioFisico).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'Información editada correctamente';
        }
      });
    }
  }
}
