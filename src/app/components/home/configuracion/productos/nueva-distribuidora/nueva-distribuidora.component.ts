import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nueva-distribuidora',
  templateUrl: './nueva-distribuidora.component.html',
  styleUrls: ['./nueva-distribuidora.component.css']
})
export class NuevaDistribuidoraComponent implements OnInit {

  idDistribuidora: number;
  distribuidora: any;

  cargando: boolean;
  disabledForm: boolean;

  modo: string;

  formDistribuidora!: FormGroup;

  constructor(
    private getService: GetService,
    private postService: PostService,
    private activatedRouter: ActivatedRoute,
    public toastService: ToastServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR';


    this.formDistribuidora = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      contacto: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      direccion: new FormControl('', [Validators.maxLength(100)]),
      cuit: new FormControl('', [Validators.maxLength(11)]),
      representante: new FormControl('', [Validators.maxLength(50)])
    });

    if (this.modo === 'EDITAR'){
      this.idDistribuidora = parseInt(this.activatedRouter.snapshot.paramMap.get('idDistribuidora'), 10);
      this.getService.obtenerDistribuidorasPorId(this.idDistribuidora).subscribe(res => {
        this.distribuidora = res;

        this.formDistribuidora.patchValue({
          nombre: this.distribuidora.nombre,
          contacto: this.distribuidora.contacto,
          direccion: this.distribuidora.direccion,
          cuit: this.distribuidora.cuit,
          representante: this.distribuidora.representante
        });
        this.cargando = false;
      });
    } else {
      this.cargando = false;
    }
  }

  crearDistribuidora(): void{
    this.disabledForm = true;
    const distribuidora: any = {
      nombre: this.formDistribuidora.value.nombre,
      contacto: this.formDistribuidora.value.contacto,
      direccion: this.formDistribuidora.value.direccion,
      cuit: this.formDistribuidora.value.cuit,
      representante: this.formDistribuidora.value.representante
    };
    if (isNaN(this.idDistribuidora)){
      this.postService.crearDistribuidora(distribuidora).subscribe(res => {
        if (res.Status){
          this.toastService.show('Distribuidora Creada', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.router.navigateByUrl('home/configuracion/distribuidoras');
          }, 2000);
        }
        console.log(res);
      }, err => {
        this.toastService.show('Error al crear' + err, { classname: 'bg-danger text-light', delay: 2000 });
        this.disabledForm = false;
      });
    } else {
      distribuidora.id_distribuidora = this.distribuidora.id_distribuidora;
      this.postService.editarDistribuidora(distribuidora).subscribe(res => {
        if (res.Status){
          this.toastService.show('Distribuidora Editada', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.router.navigateByUrl('home/configuracion/distribuidoras');
          }, 2000);
        }
        console.log(res);
      }, err => {
        this.toastService.show('Error al editar' + err, { classname: 'bg-danger text-light', delay: 2000 });
        this.disabledForm = false;
      });
    }
  }

  volver(): void {
    this.router.navigateByUrl('home/configuracion/distribuidoras');
  }
}
