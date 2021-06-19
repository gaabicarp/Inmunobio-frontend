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

  distribuidoraSeleccionada: Distribuidora;
  step: number;
  modo: string;
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 0;
    this.subscription.add( this.getService.obtenerDistribuidoras().subscribe(res => {
                            console.log(res)
                            this.distribuidoras = res;}) 
    );
    this.subscription.add( this.getService.obtenerDistribuidoras().subscribe(res => {
                            console.log(res)
                            this.distribuidoras = res; })
    );
  }
  crear(){
    this.modo = 'CREAR';
    this.step = 1;
  }

  editar(distribuidora: Distribuidora): void {
    this.distribuidoraSeleccionada = distribuidora;
    this.modo = 'EDITAR';
    this.step = 1;
  }

  eliminar(distribuidora : Distribuidora){
    this.postService.eliminarDistribuidora(distribuidora.id_distribuidora).subscribe(res =>{
      console.log(res);
    })
  }

  onVolviendo(e: number): void{
    this.step = e;
  }

}
