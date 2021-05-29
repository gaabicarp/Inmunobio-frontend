import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { GetService } from '../../../../services/get.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  permisos = [];

  usuarioSeleccionado: any;
  step: number;
  modo: string;

  constructor(private getService: GetService, private postService: PostService) { }


  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerUsuarios().subscribe(res => {
      console.log(res)
      this.usuarios = res;
    });
  }

  editar(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }

  eliminar(usuario: any){
    this.postService.eliminarUsuario(usuario.id);
  }

  onVolviendo(e: number): void{
    this.step = e;
  }

}
