import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  formUsuario!: FormGroup;
  permisos = [];
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getService.obtenerPermisos().subscribe(res => {
      this.permisos = res;
    })
    this.formUsuario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.maxLength(50)]),
      direccion: new FormControl('', [Validators.maxLength(100)]),
      telefono: new FormControl('', [Validators.maxLength(15)]),
      nivel: new FormControl('', [Validators.required]),
    });
  }

  crearUsuario(): void{
    const permisoSelected = this.permisos.filter(permiso => permiso.id == this.formUsuario.value.nivel)[0];
    const nuevoUsuario = {
      nombre: this.formUsuario.value.nombre + ' ' + this.formUsuario.value.apellido,
      password: this.formUsuario.value.password,
      username: 'gaabicarp',
      direccion: this.formUsuario.value.direccion,
      mail: this.formUsuario.value.email,
      telefono: JSON.stringify(this.formUsuario.value.telefono),
      id_permisos: [{
        descripcion: permisoSelected.descripcion,
        id: permisoSelected.id
      }]
    };
    console.log(nuevoUsuario);
    this.postService.crearUsuario(nuevoUsuario).subscribe(res => {
      console.log(res);
    });

  }

}
