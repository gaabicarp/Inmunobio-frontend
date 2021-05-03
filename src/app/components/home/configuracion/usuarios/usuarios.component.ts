import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../../services/get.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  permisos = [];

  constructor(private getService: GetService) { }


  ngOnInit(): void {
    this.getService.obtenerUsuarios().subscribe(res => {
      console.log(res)
      this.usuarios = res;
    });
  }

}
