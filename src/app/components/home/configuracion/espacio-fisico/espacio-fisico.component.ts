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
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.alert = false;
    this.getService.obtenerEspaciosFisicos().subscribe(res => {
      console.log(res)
      this.espaciosFisicos = res;
    });
  }
  eliminar(espacio: any): void{
    this.postService.eliminarEspacioFisico(espacio.id_espacioFisico).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Espacio fisico eliminado correctamente';
        setTimeout(() => {
          this.ngOnInit()
        }, 2000);
      }
      console.log(res);
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    });
  }

}
