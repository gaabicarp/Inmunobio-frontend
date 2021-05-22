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
  @Output() volver = new EventEmitter();

  formUsuario!: FormGroup;
  permisos = [];

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getService.obtenerPermisos().subscribe(res => {
      console.log(res)
      this.permisos = res;
    });
    this.formUsuario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.maxLength(50)]),
      direccion: new FormControl('', [Validators.maxLength(100)]),
      telefono: new FormControl('', [Validators.maxLength(15)]),
      nivel: new FormControl('', [Validators.required]),
    });
    if (this.modo === 'EDITAR'){
      this.formUsuario.patchValue({
        nombre: this.element.nombre,
        email: this.element.email,
        password: this.element.password,
        direccion: this.element.direccion,
        telefono: this.element.telefono,
        nivel: this.element.id_permisos[0].id_permiso
      });
      console.log(this.element.id_permisos[0])
    }
  }

  crearUsuario(): void{
    const permisoSelected = this.permisos.filter(permiso => permiso.id == this.formUsuario.value.nivel)[0];
    const usuario = {
      nombre: this.formUsuario.value.nombre,
      password: this.formUsuario.value.password,
      direccion: this.formUsuario.value.direccion,
      mail: this.formUsuario.value.email,
      telefono: JSON.stringify(this.formUsuario.value.telefono),
      id_permisos: [{
        descripcion: permisoSelected.descripcion,
        id: permisoSelected.id
      }]
    };
    if (this.modo === 'CREAR'){
      this.postService.crearUsuario(usuario).subscribe(res => {
        console.log(res);
      });
    } else {
      this.postService.editarUsuario(usuario).subscribe(res => {
        console.log(res);
      });
    }
  }

  onVolver(): void{
    this.volver.emit();
  }
}
