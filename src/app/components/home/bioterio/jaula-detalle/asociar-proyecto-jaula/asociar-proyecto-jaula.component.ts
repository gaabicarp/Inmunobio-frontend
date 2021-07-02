import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Jaula } from 'src/app/models/jaula.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-asociar-proyecto-jaula',
  templateUrl: './asociar-proyecto-jaula.component.html',
  styleUrls: ['./asociar-proyecto-jaula.component.css']
})
export class AsociarProyectoJaulaComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  idJaula: number;
  jaula:Jaula;
  proyectos=[];
  proyecto:any;
  formProyecto!:FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  
  constructor(private postService: PostService,private getService: GetService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.subscription.add(this.getService.obtenerJaulasPorId(this.idJaula).subscribe(res => {
      console.log(res)
      this.jaula = res;
    }))
    this.subscription.add(this.getService.obtenerProyectos().subscribe(res => {
      this.proyectos = res.filter(proyecto => !proyecto.finalizado );
      console.log(res)
    }))
    this.formProyecto = new FormGroup({
      id_proyecto : new FormControl('', [Validators.required, ]) })
  }
  asociar(){
    this.getService.obtenerProyectosPorId(this.formProyecto.value.id_proyecto).subscribe(res =>{
      this.proyecto = res;
    })
    setTimeout(() => {
      console.log(this.proyecto)
    const datos: any = {
      id_jaula : this.idJaula,
      id_proyecto : parseInt(this.formProyecto.value.id_proyecto),
      nombre_proyecto: this.proyecto.nombre
    }
    console.log(datos)
    this.subscription.add(this.postService.asignarJaulaProyecto(datos).subscribe(res => {
      console.log(res)
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Jaula asociada correctamente';
      }
      } , err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
    }))
    }, 500);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
