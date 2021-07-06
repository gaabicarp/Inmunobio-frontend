import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { GetService } from '../../../../services/get.service';
import { Subscription } from 'rxjs';
import { Distribuidora } from '../../../../models/distribuidora.model';

@Component({
  selector: 'app-distribuidoras',
  templateUrl: './distribuidoras.component.html',
  styleUrls: ['./distribuidoras.component.css']
})
export class DistribuidorasComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  distribuidoras : Distribuidora;

  estado: string;
  mensajeAlert: string;
  alert: boolean;
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.alert = false;
    this.subscription.add( this.getService.obtenerDistribuidoras().subscribe(res => {
                            console.log(res)
                            this.distribuidoras = res;}) 
    );
    this.subscription.add( this.getService.obtenerDistribuidoras().subscribe(res => {
                            console.log(res)
                            this.distribuidoras = res; })
    );
  }
  eliminar(distribuidora : Distribuidora){
    this.postService.eliminarDistribuidora(distribuidora.id_distribuidora).subscribe(res =>{
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Distribuidora eliminada correctamente';
        setTimeout(() => {
          this.ngOnInit()
        }, 2000);
      }
      console.log(res);
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    })
  }

}
