import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';

@Component({
  selector: 'app-distribuidoras',
  templateUrl: './distribuidoras.component.html',
  styleUrls: ['./distribuidoras.component.css']
})
export class DistribuidorasComponent implements OnInit {
  distribuidoras = [];

  distribuidoraSeleccionada: any;
  step: number;
  modo: string;
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.step = 0;
    this.getService.obtenerDistribuidoras().subscribe(res => {
      console.log(res)
      this.distribuidoras = res;
    });
  }

  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }

  editar(distribuidora: any): void {
    this.distribuidoraSeleccionada = distribuidora;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  eliminar(distribuidora : any){
    this.postService.eliminarDistribuidora(distribuidora.id_distribuidora).subscribe(res =>{
      console.log(res);
    })
  }

  volver(){
    this.step = 0;
  }

}
