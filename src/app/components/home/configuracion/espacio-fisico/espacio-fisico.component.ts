import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-espacio-fisico',
  templateUrl: './espacio-fisico.component.html',
  styleUrls: ['./espacio-fisico.component.css']
})
export class EspacioFisicoComponent implements OnInit {

  espaciosFisicos = [];
  estado: string;
  cargando: boolean;

  constructor(
    private getService: GetService,
    private postService: PostService,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.cargando = true;

    this.getService.obtenerEspaciosFisicos().subscribe(res => {
      console.log(res)
      this.espaciosFisicos = res;
      this.cargando = false;
    });
  }

  eliminar(espacio: any): void{
    this.postService.eliminarEspacioFisico(espacio.id_espacioFisico).subscribe(res => {
      // console.log(res)
      if (res.Status){
        this.toastService.show('Distribuidora Eliminada', { classname: 'bg-danger text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
        }, 2000);
      }
      // console.log(res);
    });
  }

}
