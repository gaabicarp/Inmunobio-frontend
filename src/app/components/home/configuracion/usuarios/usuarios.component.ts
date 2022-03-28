import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { GetService } from '../../../../services/get.service';
import { Usuario } from '../../../../models/usuarios.model';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuariosTodos: Usuario[];
  permisos = [];
  cargando: boolean;

  usuarioSeleccionado: Usuario;

  page: number;
  pageSize: number;
  collectionSize: number;

  constructor(
    private getService: GetService,
    private postService: PostService,
    public toastService: ToastServiceService
    ) { }


  ngOnInit(): void {
    this.cargando = true;
    this.page = 1;
    this.pageSize = 10;
    this.getService.obtenerUsuarios().subscribe(res => {
      if (res){
        this.usuariosTodos = res;
        this.usuarios = res;
        this.collectionSize = res.length;
        this.refreshUsers();
        this.cargando = false;
      } else {
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    });
  }

  eliminar(usuario: Usuario): void{
    this.postService.eliminarUsuario(usuario.id).subscribe(res => {
      if (res.Status){
        this.toastService.show('Usuario Eliminado', { classname: 'bg-danger text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
        }, 2000);
      }
    });
  }

  refreshUsers(): void {
    this.usuarios = this.usuariosTodos
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
