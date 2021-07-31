import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { postUsuario, Usuario } from 'src/app/models/usuarios.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  modo: string;
  usuario: any;
  idUsuario: number;
  formUsuario!: FormGroup;
  permisos = [];


  itemList: any = [];
  selectedItems = [];
  settings = {};

  constructor(
    private getService: GetService,
    private postService: PostService,
    private router: Router,
    public toastService: ToastServiceService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR';

    this.getService.obtenerPermisos().subscribe((res: any) => {
      this.permisos = res;
      this.itemList = res.filter(permiso => permiso.id_permiso !== 5);
    });

    this.settings = {
      text: 'Seleccione permisos',
      selectAllText: 'Seleccione Todos',
      unSelectAllText: 'Quitar Todos',
      classes: 'myclass custom-class',
      primaryKey: 'id_permiso',
      labelKey: 'descripcion',
      enableSearchFilter: true,
      searchBy: ['descripcion'],
    };

    this.formUsuario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.maxLength(50)]),
      direccion: new FormControl('', [Validators.maxLength(100)]),
      telefono: new FormControl('', [Validators.maxLength(15)]),
      nivel: new FormControl([],  ),
    });

    if (this.modo === 'EDITAR'){
      this.idUsuario = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
      this.getService.obtenerUsuariosPorId(this.idUsuario).subscribe(res => {
        console.log(res);
        this.usuario = res;

        this.formUsuario.patchValue({
          nombre: this.usuario.nombre,
          email: this.usuario.email,
          password: this.usuario.password,
          direccion: this.usuario.direccion,
          telefono: this.usuario.telefono,
          nivel: this.usuario.permisos
        });
      });
    }
  }

  crearUsuario(): void{
    const usuario: postUsuario = {
      nombre: this.formUsuario.value.nombre,
      password: this.formUsuario.value.password,
      direccion: this.formUsuario.value.direccion,
      email: this.formUsuario.value.email,
      telefono: JSON.stringify(this.formUsuario.value.telefono),
      permisos: this.formUsuario.value.nivel
    };

    if (this.modo === 'CREAR'){
      this.postService.crearUsuario(usuario).subscribe(res => {
        if (res.Status){
          this.toastService.show('Usuario Creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => { this.volver(); }, 2000);
        }
      }, err => {
        this.toastService.show('Problema al crear usuario' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
      });
    } else {
      usuario.id_usuario = this.usuario.id_usuario;
      this.postService.editarUsuario(usuario).subscribe(res => {
        console.log(res);
        if (res.Status){
          this.toastService.show('Usuario Editado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => { this.volver(); }, 2000);
        }
      }, err => {
        this.toastService.show('Problema al editar usuario' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
      });
    }
  }

  volver(): void{
    this.router.navigateByUrl('home/configuracion/usuarios');
  }
}
