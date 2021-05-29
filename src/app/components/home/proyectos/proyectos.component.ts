import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos = [];
  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.getService.obtenerProyectos().subscribe(res => {
      console.log(res);
      this.proyectos = res;
    })
  }

}
