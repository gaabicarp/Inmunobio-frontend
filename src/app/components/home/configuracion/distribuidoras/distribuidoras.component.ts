import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import { Subscription } from 'rxjs';
import { Distribuidora } from '../../../../models/distribuidora.model';
import { ASTWithSource } from '@angular/compiler';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-distribuidoras',
  templateUrl: './distribuidoras.component.html',
  styleUrls: ['./distribuidoras.component.css']
})
export class DistribuidorasComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  distribuidoras: Distribuidora;
  cargando: boolean;

  constructor(
    private getService: GetService,
    private postService: PostService,
    public toastService: ToastServiceService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cargando = true;
    this.subscription.add(
      this.getService.obtenerDistribuidoras().subscribe(res => {
        console.log(res);
        this.distribuidoras = res;
        this.cargando = false;
      })
    );
  }

  eliminar(distribuidora: Distribuidora): void{
    this.postService.eliminarDistribuidora(distribuidora.id_distribuidora).subscribe(res =>{
      if (res.Status === 'ok'){
        this.toastService.show('Distribuidora Eliminada', { classname: 'bg-danger text-light', delay: 2000 });
      }
      // console.log(res);
    });
  }

}
