import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  @Input() element!: any;
  @Input() modo!: string;
  @Output() volviendo = new EventEmitter<number>();

  formUsuario!: FormGroup;
  permisos = [];
  estado: string;
  mensajeAlert: string;
  alert: boolean;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.alert = false;
    this.getService.obtenerPermisos().subscribe(res => {
      this.permisos = res;
    });
    this.formUsuario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.maxLength(50)]),
      direccion: new FormControl('', [Validators.maxLength(100)]),
      telefono: new FormControl('', [Validators.maxLength(15)]),
      nivel: new FormControl('',  ),
    });
    if (this.modo === 'EDITAR'){
      const niveles = [];
      this.element.permisos.map( perm => {
        niveles.push(JSON.stringify(perm.id_permiso));
      });
      this.formUsuario.patchValue({
        nombre: this.element.nombre,
        email: this.element.email,
        password: this.element.password,
        direccion: this.element.direccion,
        telefono: this.element.telefono,
        nivel: niveles
      });
    }
  }

  crearUsuario(): void{
    const idpermisos: string[] = this.formUsuario.value.nivel;
    const permisoSelected = this.permisos.filter(permiso => {
      return idpermisos.includes(JSON.stringify(permiso.id_permiso));
    });
    const usuario: any = {
      nombre: this.formUsuario.value.nombre,
      password: this.formUsuario.value.password,
      direccion: this.formUsuario.value.direccion,
      email: this.formUsuario.value.email,
      telefono: JSON.stringify(this.formUsuario.value.telefono),
      permisos: permisoSelected
    };
    if (this.modo === 'CREAR'){
      this.postService.crearUsuario(usuario).subscribe(res => {
        console.log(res);
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El usuario fue creado correctamente';
          setTimeout(() => {
            this.volviendo.emit(0);
          }, 2000);
        }
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      usuario.id_usuario = this.element.id_usuario;
      this.postService.editarUsuario(usuario).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El usuario fue editado correctamente';
          setTimeout(() => {
            this.volviendo.emit(0);
          }, 2000);
        }
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }

  volver(): void{
    this.volviendo.emit(0);
  }
}
