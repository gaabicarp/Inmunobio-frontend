import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { GetService } from '../../../../services/get.service';
import { Usuario } from '../../../../models/usuarios.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  permisos = [];

  usuarioSeleccionado: Usuario;
  step: number;
  modo: string;

  constructor(private getService: GetService, private postService: PostService) { }


  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerUsuarios().subscribe(res => {
      this.usuarios = res;
    });
  }

  editar(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  crear(): void{
    this.modo = 'CREAR';
    this.step = 1;
  }

  eliminar(usuario: Usuario): void{
    this.postService.eliminarUsuario(usuario.id_usuario).subscribe(res => {
      console.log(res);
    });
  }

  onVolviendo(e: number): void{
    this.step = e;
  }

}
