import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nueva-distribuidora',
  templateUrl: './nueva-distribuidora.component.html',
  styleUrls: ['./nueva-distribuidora.component.css']
})
export class NuevaDistribuidoraComponent implements OnInit {

  idDistribuidora:number;
  distribuidora:any;
  formDistribuidora!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;

  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.alert = false;
    this.idDistribuidora = parseInt(this.activatedRouter.snapshot.paramMap.get('idDistribuidora'), 10);
    if (!isNaN(this.idDistribuidora)){
    this.getService.obtenerDistribuidorasPorId(this.idDistribuidora).subscribe(res => {
      this.distribuidora=res;
    })
    }
    this.formDistribuidora = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      contacto: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      direccion: new FormControl('', [Validators.maxLength(100)]),
      cuit: new FormControl('', [Validators.maxLength(11)]),
      representante: new FormControl('', [Validators.maxLength(50)])
    });
    setTimeout(() => {
      if (!isNaN(this.idDistribuidora)){
        this.formDistribuidora.patchValue({
          nombre: this.distribuidora.nombre,
          contacto: this.distribuidora.contacto,
          direccion: this.distribuidora.direccion,
          cuit: this.distribuidora.cuit,
          representante: this.distribuidora.representante
        });
      }
    }, 500);
    
  }

  crearDistribuidora(): void{
    const distribuidora : any = {
      nombre: this.formDistribuidora.value.nombre,
      contacto: this.formDistribuidora.value.contacto,
      direccion: this.formDistribuidora.value.direccion,
      cuit: this.formDistribuidora.value.cuit,
      representante: this.formDistribuidora.value.representante
    };
    if (isNaN(this.idDistribuidora)){
      this.postService.crearDistribuidora(distribuidora).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'La distribuidora fue creada correctamente';
        }
        console.log(res);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      distribuidora.id_distribuidora = this.distribuidora.id_distribuidora
      this.postService.editarDistribuidora(distribuidora).subscribe(res => {
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
    }
  }
  
}
