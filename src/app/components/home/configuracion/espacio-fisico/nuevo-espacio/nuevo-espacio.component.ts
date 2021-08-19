import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['./nuevo-espacio.component.css']
})
export class NuevoEspacioComponent implements OnInit {
  formEspacio!: FormGroup;
  idEspacio:number;
  espacio:any;

  modo: string;
  cargando: boolean;
  disabledForm: boolean;

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

    this.formEspacio = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      piso: new FormControl('', [Validators.maxLength(50)]),
      sala: new FormControl('', [Validators.maxLength(50)]),
      descripcion: new FormControl('', [Validators.maxLength(100)])
    });

    if (this.modo === 'EDITAR'){
      this.idEspacio = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
      this.getService.obtenerEspacioFisico(this.idEspacio).subscribe(res => {
        this.espacio = res;
        this.formEspacio.patchValue({
          nombre: this.espacio.nombre,
          piso: this.espacio.piso,
          sala: this.espacio.sala,
          descripcion: this.espacio.descripcion
        });
        this.cargando = false;
      });
    } else {
      this.cargando = false;
    }
  }

  crearEspacio(): void {
    this.disabledForm = true;
    const espacioFisico = this.formEspacio.value;
    if (this.modo === 'CREAR'){
      this.postService.crearEspacio(espacioFisico).subscribe(res => {
        if (res.Status === 'ok'){
          this.toastService.show('Espacio Creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => { 
            this.volver()
            this.toastService.removeAll()
          }, 2000);
        }
      }, err => {
        this.toastService.show('Error al crear' + err, { classname: 'bg-danger text-light', delay: 2000 });
        this.disabledForm = false;
      });
    } else {
      espacioFisico.id_espacioFisico = this.espacio.id_espacioFisico;
      this.postService.editarEspacio(espacioFisico).subscribe(res => {
        if (res.Status){
          this.toastService.show('Espacio Editado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => { 
            this.volver()
            this.toastService.removeAll()
          }, 2000);
        }
      }, err => {
        this.toastService.show('Error al editar' + err, { classname: 'bg-danger text-light', delay: 2000 });
        this.disabledForm = false;
      });
    }
  }

  volver(): void {
    this.router.navigateByUrl('home/configuracion/espacio-fisico');
  }
}
