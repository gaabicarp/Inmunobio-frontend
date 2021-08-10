import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.css']
})
export class NuevoGrupoComponent implements OnInit {
  modo: string;
  idGrupo: number;
  grupoTrabajo: any;
  formGrupo!: FormGroup;

  usuariosDisponibles = [];
  jefesDeGrupo = [];

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

    this.formGrupo = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      jefeGrupo: new FormControl('', [Validators.required]),
      usuarios: new FormControl([])
    });

    this.settings = {
      text: 'Seleccione Usuarios',
      selectAllText: 'Seleccione Todos',
      unSelectAllText: 'Quitar Todos',
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'nombre',
      enableSearchFilter: true,
      searchBy: ['nombre'],
      disabled: true
    };

    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR';

    this.getService.obtenerUsuarios().subscribe(res => {
      this.itemList = res;
      this.jefesDeGrupo = res.filter(usuario => {
        return usuario.permisos.some(permiso => permiso.id_permiso === 3);
      });



      // if (this.modo === 'EDITAR'){
      //   this.formGrupo.patchValue({
      //     nombre: this.element.nombre,
      //     jefeGrupo: this.element.jefeDeGrupo
      //   });
      //   this.usuariosAsignados = res.filter(usuario => {
      //     return this.element.integrantes.includes(usuario.id_usuario);
      //   });
      //   this.usuariosDisponibles = res.filter(usuario => {
      //     return !this.element.integrantes.includes(usuario.id_usuario);
      //   });
      // } else {
      //   this.usuariosDisponibles = res;
      // }
    });

    if ( this.modo === 'EDITAR'){
      this.idGrupo = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
      this.getService.obtenerGrupoTrabajoPorId(this.idGrupo).subscribe(res => {
        console.log(res);
        this.grupoTrabajo = res;
        this.formGrupo.patchValue({
          nombre: res.nombre,
          jefeGrupo: res.jefeDeGrupo,
          usuarios: res.integrantes
        })
        this.settings = {
          text: 'Seleccione Usuarios',
          selectAllText: 'Seleccione Todos',
          unSelectAllText: 'Quitar Todos',
          classes: 'myclass custom-class',
          primaryKey: 'id',
          labelKey: 'nombre',
          enableSearchFilter: true,
          searchBy: ['nombre'],
          disabled: false
        };
      })
    }
  }

  // asignarUsuario(usuario: any): void{
  //   this.usuariosDisponibles = this.usuariosDisponibles.filter(usuarioSeleccionado => {
  //     return usuarioSeleccionado !== usuario;
  //   });
  //   this.usuariosAsignados.push(usuario);
  // }

  // desasignarUsuario(usuario: any): void{
  //   this.usuariosAsignados = this.usuariosAsignados.filter(usuarioSeleccionado => {
  //     return usuarioSeleccionado !== usuario;
  //   });
  //   this.usuariosDisponibles.push(usuario);
  // }

  crearGrupo(): void {
    const int = [];
    this.usuariosAsignados.map(usuario => {
      int.push(usuario.id_usuario);
    });
    if (this.modo === 'CREAR'){
      const grupoTrabajo = {
        nombre: this.formGrupo.value.nombre,
        jefeDeGrupo: this.formGrupo.value.jefeGrupo,
        integrantes: int,
      };
      this.postService.crearGrupoTrabajo(grupoTrabajo).subscribe(res => {
        console.log(res);
      });
    } else {
      const editarGrupo = {
        id_grupoDeTrabajo: this.element.id_grupoDeTrabajo,
        integrantes: int
      };

      this.postService.editarGrupoTrabajo(editarGrupo).subscribe(res => {
        console.log(res);
      });

      const editarJefe = {
        id_grupoDeTrabajo: this.element.id_grupoDeTrabajo,
        jefeDeGrupo: JSON.parse(this.formGrupo.value.jefeGrupo)
      };

      console.log(editarJefe)
      this.postService.editarJefeGrupo(editarJefe).subscribe(res => {
        console.log(res);
      });
    }
  }

  volver(): void{
    this.volviendo.emit(0);
  }

}
