import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nuevo-contenedor',
  templateUrl: './nuevo-contenedor.component.html',
  styleUrls: ['./nuevo-contenedor.component.css']
})
export class NuevoContenedorComponent implements OnInit {

  proyectos = [];
  espacios =[];
  contenedores =[];

  cargando: boolean;
  disabledForm: boolean;
  modo: string;

  idContenedor: number;
  formContenedor!: FormGroup;
  editar = false;
  contenedor: any;

  constructor(
    private getService: GetService,
    private postService: PostService,
    private activatedRouter: ActivatedRoute,
    public toastService: ToastServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.getService.obtenerProyectos().subscribe(res => {
      if (res){
        this.proyectos = res;
        this.cargando = false;
      } else {
        this.proyectos = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    });
    this.getService.obtenerEspaciosFisicos().subscribe(res =>{
      if (res){
        this.espacios = res;
        this.cargando = false;
      } else {
        this.espacios = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    });

    this.formContenedor = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      descripcion: new FormControl('', [Validators.maxLength(100)]),
      temperatura : new FormControl('', [Validators.maxLength(10)]),
      proyecto: new FormControl('-1', [Validators.maxLength(50)]),
      capacidad: new FormControl('', [Validators.maxLength(10)]),
      fichaTecnica: new FormControl('', [Validators.maxLength(100)]),
      espacioFisico: new FormControl('-1', [Validators.maxLength(30)]),
      disponible: new FormControl('', [Validators.maxLength(10)])
    });

    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR';

    if (this.modo === 'EDITAR'){
      this.idContenedor = parseInt(this.activatedRouter.snapshot.paramMap.get('idContenedor'), 10);
      this.getService.obtenerContenedores().subscribe((res: any) => {
        if (res){
          this.contenedor = res.find(contenedor => contenedor.id_contenedor === this.idContenedor);
  
          this.formContenedor.patchValue({
            codigo: this.contenedor.codigo,
            nombre: this.contenedor.nombre,
            descripcion: this.contenedor.descripcion,
            temperatura: this.contenedor.temperatura,
            proyecto: this.contenedor.id_proyecto,
            espacioFisico :  this.contenedor.id_espacioFisico,
            capacidad: this.contenedor.capacidad,
            fichaTecnica: this.contenedor.fichaTecnica,
            disponible: this.contenedor.disponible
          });
          this.cargando = false;
        } else {
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
      });
    } else {
      this.cargando = false;
    }
  }

  crearContenedor(): void{
    this.disabledForm = true;
    let estado = false;
    const checkbox = document.getElementById('disponible') as HTMLInputElement ;
    const estaTrue = checkbox.checked;
    if (estaTrue){
        estado = true;
    }
    const contenedor: any = {
      codigo: this.formContenedor.value.codigo,
      nombre: this.formContenedor.value.nombre,
      descripcion: this.formContenedor.value.descripcion,
      id_proyecto: this.formContenedor.value.proyecto,
      id_espacioFisico : this.formContenedor.value.espacioFisico,
      capacidad: this.formContenedor.value.capacidad,
      temperatura: this.formContenedor.value.temperatura,
      fichaTecnica: this.formContenedor.value.fichaTecnica,
      disponible: estado
    };
    // console.log(contenedor)
    if (this.modo === 'CREAR'){
      this.postService.crearContenedor(contenedor).subscribe(res => {
        console.log(res);
        if (res.Status){
          this.toastService.show('Contenedor Creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => { 
            this.volver();
            this.toastService.removeAll()
          }, 2000);
        }
        // console.log(res);
      }, err => {
        this.toastService.show('Problema al crear contenedor' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
        this.disabledForm = true;
      });
    } else {
      contenedor.id_contenedor = this.contenedor.id_contenedor;
      this.postService.editarContenedor(contenedor).subscribe(res => {
        if (res.Status){
          this.toastService.show('Contenedor Editado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => { 
            this.volver();
            this.toastService.removeAll() 
          }, 2000);
        }
        console.log(res);
      }, err => {
        this.toastService.show('Problema al editar contenedor' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
        this.disabledForm = true;
      });
    }
  }

  volver(): void{
    this.router.navigateByUrl('home/configuracion/contenedores');
  }
  

}
