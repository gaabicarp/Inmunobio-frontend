import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-espacio-fisico',
  templateUrl: './espacio-fisico.component.html',
  styleUrls: ['./espacio-fisico.component.css']
})
export class EspacioFisicoComponent implements OnInit {

  espaciosFisicos = [];

  espacioSeleccionado: any;
  step: number;
  modo: string;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerEspaciosFisicos().subscribe(res => {
      console.log(res)
      this.espaciosFisicos = res;
    });
  }

  editar(espacio: any): void{
    this.espacioSeleccionado = espacio;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  crear(): void {
    this.modo = 'CREAR';
    this.step = 1;
  }

  eliminar(espacio: any): void{
    // this.postService.eliminarEspacioFisico(espacio.id_espacio).subscribe(res => {
    //   console.log(res);
    // });
  }

  onVolviendo(e: number): void {
    this.step = e;
  }

}
