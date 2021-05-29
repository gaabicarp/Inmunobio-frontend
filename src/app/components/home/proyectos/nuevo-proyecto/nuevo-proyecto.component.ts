import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
  formProyecto!: FormGroup;
  directoresProyecto = [];
  usuariosDisponibles = [];
  usuariosAsignados = [];

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.formProyecto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      codigoProyecto: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      montoInicial: new FormControl(''),
      idDirectorProyecto: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    });
    this.getService.obtenerUsuarios().subscribe(res => {
      this.directoresProyecto = res.filter(usuario => {
        return usuario.permisos.some(permiso => permiso.id_permiso === 4);
      });
      this.usuariosDisponibles = res;
    });
  }

  asignarUsuario(usuario: any): void{
    this.usuariosDisponibles = this.usuariosDisponibles.filter(usuarioSeleccionado => {
      return usuarioSeleccionado !== usuario;
    });
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
    const proyecto = {
      codigoProyecto: this.formProyecto.value.codigoProyecto,
      nombre: this.formProyecto.value.nombre,
      descripcion: this.formProyecto.value.descripcion,
      participantes: int,
      idDirectorProyecto: JSON.parse(this.formProyecto.value.idDirectorProyecto),
      montoInicial: this.formProyecto.value.montoInicial,
    };

    this.postService.crearProyecto(proyecto).subscribe(res => {
      console.log(res);
    });
  }

}
