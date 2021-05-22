import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.css']
})
export class NuevoGrupoComponent implements OnInit {

  usuariosDisponibles = [];
  usuariosAsignados = [];

  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.getService.obtenerUsuarios().subscribe(res => {
      this.usuariosDisponibles = res;
    });
  }

  asignarUsuario(usuario: any){
    this.usuariosDisponibles = this.usuariosDisponibles.filter(usuarioSeleccionado => {
      return usuarioSeleccionado !== usuario;
    });
    this.usuariosAsignados.push(usuario);
  }

}
