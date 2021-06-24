import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuarios.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
  element!: any;
  modo!: string;
  mensajeAlert: string;
  alert!: boolean;
  estado!: string;

  formProyecto!: FormGroup;
  idProyecto!: number;
  directoresProyecto = [];
  usuariosDisponibles = [];
  usuariosAsignados = [];

  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR'
    this.formProyecto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      codigoProyecto: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      montoInicial: new FormControl(''),
      idDirectorProyecto: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    });
    this.getService.obtenerUsuarios().subscribe(res => {
      // console.log(res);
      this.directoresProyecto = res.filter(usuario => {
        return usuario.permisos.some(permiso => permiso.id_permiso === 4);
      });
      this.usuariosDisponibles = res;
      // console.log(this.directoresProyecto)
    });

    if (this.modo === 'EDITAR'){
      this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
      this.getService.obtenerProyectosPorId(this.idProyecto).subscribe(res => {
        this.element = res;
        this.formProyecto.patchValue({
        nombre: this.element.nombre,
        codigoProyecto: this.element.codigoProyecto,
        montoInicial: this.element.montoInicial,
        idDirectorProyecto: this.element.idDirectorProyecto,
        descripcion: this.element.descripcion
      });
      this.getService.obtenerUsuarioPorProyecto(this.element.id_proyecto).subscribe(res => {
            res.map(usuario => {
            this.asignarUsuario(usuario);
          });
        });
      })
   }

  }

  asignarUsuario(usuario: any): void{
    console.log(usuario)
    // console.log(this.usuariosDisponibles)
    this.usuariosDisponibles = this.usuariosDisponibles.filter(usuarioSeleccionado => {
      return usuarioSeleccionado !== usuario;
    });
    console.log(this.usuariosDisponibles)
    this.usuariosAsignados.push(usuario);
  }

  desasignarUsuario(usuario: any): void{
    this.usuariosAsignados = this.usuariosAsignados.filter(usuarioSeleccionado => {
      return usuarioSeleccionado !== usuario;
    });
    this.usuariosDisponibles.push(usuario);
  }

  crearProyecto(): void {
    const int = [];
    this.usuariosAsignados.map(usuario => {
      int.push(usuario.id_usuario);
    });
    const proyecto: any = {
      codigoProyecto: this.formProyecto.value.codigoProyecto,
      nombre: this.formProyecto.value.nombre,
      descripcion: this.formProyecto.value.descripcion,
      participantes: int,
      idDirectorProyecto: JSON.parse(this.formProyecto.value.idDirectorProyecto),
      montoInicial: this.formProyecto.value.montoInicial,
    };

    if (this.modo === 'CREAR'){
      this.postService.crearProyecto(proyecto).subscribe(res => {
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El proyecto fue creado correctamente';
          setTimeout(() => {
            this.volver()
          }, 2000);
        }, err => {
          this.alert = true;
          this.estado = 'danger';
          this.mensajeAlert = JSON.stringify(err.error.error);
        });
    } else {
      proyecto.id_proyecto = this.idProyecto;
      this.postService.modificarProyecto(proyecto).subscribe(res =>{
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El proyecto fue editado correctamente';
          setTimeout(() => {
            this.volver()
          }, 2000);
        }, err => {
          this.alert = true;
          this.estado = 'danger';
          this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }

  volver(): void{
    let ruta;
    this.modo === 'EDITAR' ? ruta = `home/proyectos/${this.idProyecto}` : ruta = 'home/proyectos';
    this.router.navigateByUrl(ruta);
  }

}
