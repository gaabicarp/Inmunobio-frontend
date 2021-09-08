import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario:any;
  constructor() { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario)
  }

}
