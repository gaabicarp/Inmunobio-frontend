import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BlogsBuscadosHerr } from 'src/app/models/blogs.model';
import { Herramienta } from 'src/app/models/herramientas.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() espacio!: any;
  @Output() volviendo = new EventEmitter<number>();

  herramientas= [];
  herramientasFiltradas=[];
  step: number;
  id_espacio:number;
  herramientaSeleccionada: Herramienta;
  modo: string;
  
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.step = 6;
    console.log(this.espacio)
    this.subscription.add( this.getService.obtenerHerramientas().subscribe(res => {
      console.log(res)
      this.herramientas = res; })
    );
   setTimeout(() => {
      const id = this.espacio
      this.herramientasFiltradas =  this.herramientas.filter(function(herramienta) {
        return herramienta.id_espacioFisico == id;
      });
      console.log(this.herramientasFiltradas)
    }, 500);
  }
  nuevaHerramienta(): void{
    this.modo = 'CREAR';
    this.id_espacio = this.espacio;
    this.step = 7;

  }
  editar(herramienta: Herramienta): void {
    this.herramientaSeleccionada = herramienta;
    this.modo = 'EDITAR';
    this.step = 7;
  }
  eliminar(herramienta : Herramienta){
    this.postService.eliminarHerramienta(herramienta.id_herramienta).subscribe(res =>{
      console.log(res);
    })
  }
  irBlogs(a: Herramienta){
    this.herramientaSeleccionada = a;
    this.step = 8;
  }
  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }

}
