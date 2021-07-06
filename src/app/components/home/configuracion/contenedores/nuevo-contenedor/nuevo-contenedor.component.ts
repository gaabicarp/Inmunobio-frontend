import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-contenedor',
  templateUrl: './nuevo-contenedor.component.html',
  styleUrls: ['./nuevo-contenedor.component.css']
})
export class NuevoContenedorComponent implements OnInit {

  proyectos = [];
  espacios =[];
  contenedores =[];
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  idContenedor:number;
  formContenedor!: FormGroup;
  editar = false;
  contenedor:any;

  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.idContenedor = parseInt(this.activatedRouter.snapshot.paramMap.get('idContenedor'), 10);
    if (!isNaN(this.idContenedor)){
      this.getService.obtenerContenedores().subscribe(res =>{
        this.contenedores = res;
        console.log(res)
      })
      this.editar =true;
      setTimeout(() => {
        this.contenedor = this.contenedores.find(contenedor => contenedor.id_contenedor === this.idContenedor)
        console.log(this.contenedor)
      }, 500);
    }
    this.getService.obtenerProyectos().subscribe(res => {
      console.log(res)
      this.proyectos = res;
    });
    this.getService.obtenerEspaciosFisicos().subscribe(res =>{
      this.espacios = res;
    })
    this.formContenedor = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      descripcion: new FormControl('', [Validators.maxLength(100)]),
      temperatura : new FormControl('', [Validators.maxLength(10)]),
      proyecto: new FormControl('0', [Validators.maxLength(50)]),
      capacidad: new FormControl('', [Validators.maxLength(10)]),
      fichaTecnica: new FormControl('', [Validators.maxLength(100)]),
      espacioFisico: new FormControl('', [Validators.maxLength(30)]),
      disponible: new FormControl('', [Validators.maxLength(10)])
    });
    setTimeout(() => {
      if (!isNaN(this.idContenedor)){
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
      }
    }, 500);
  }

  crearContenedor(): void{
    var estado = false;
    var checkbox = document.getElementById('disponible') as HTMLInputElement ;
    var estaTrue = checkbox.checked;
      if(estaTrue){
        estado = true;
      }
    console.log(estado)
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
    console.log(contenedor)
    if (isNaN(this.idContenedor)){
      this.postService.crearContenedor(contenedor).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'Contenedor creado correctamente';
        }
        console.log(res);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      contenedor.id_contenedor = this.contenedor.id_contenedor
      this.postService.editarContenedor(contenedor).subscribe(res => {
        if (res.Status === 'Ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'Información editada correctamente';
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
