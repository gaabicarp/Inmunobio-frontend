import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Jaula } from 'src/app/models/jaula.model';

@Component({
  selector: 'app-editar-jaula',
  templateUrl: './editar-jaula.component.html',
  styleUrls: ['./editar-jaula.component.css']
})
export class EditarJaulaComponent implements OnInit {
  @Input() element!: any;
  @Input() modo!: string;
  @Output() volviendo = new EventEmitter<number>();
  
  espaciosFisicos = [];
  proyectos = [];
  formJaula!: FormGroup;
  mensajeAlert: string;
  estado: string;
  alert: boolean;
  step:number;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.step = 2;
    this.getService.obtenerEspaciosFisicos().subscribe(res => {
      this.espaciosFisicos = res;
    });
    this.getService.obtenerProyectos().subscribe(res => {
      this.proyectos = res.filter(proyecto => !proyecto.finalizado );
      console.log(res)
    });
    this.formJaula = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      rack: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      estante: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      capacidad: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tipo: new FormControl('', [Validators.maxLength(100)]),
      id_espacioFisico: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      id_proyecto: new FormControl('')
    });
    if (this.modo === 'EDITAR'){
      this.formJaula.patchValue({
      codigo: this.element.codigo,
      rack: this.element.rack,
      estante:this.element.estante,
      capacidad: this.element.capacidad,
      tipo: this.element.tipo,
      id_espacioFisico: this.element.id_espacio_fisico,
      // id_proyecto: this.element.id_proyecto
      id_proyecto: 1
      });
    }
  }

  crearJaula(): void{
    const jaula : Jaula ={
      codigo: this.formJaula.value.codigo,
      rack : this.formJaula.value.rack,
      estante : this.formJaula.value.estante,
      capacidad:this.formJaula.value.capacidad,
      // id_proyecto: this.formJaula.value.id_proyecto,
      id_proyecto: 1,
      id_espacioFisico:this.formJaula.value.id_espacioFisico,
      tipo: this.formJaula.value.tipo
    }
    if (this.modo === 'CREAR'){
      this.postService.crearJaula(jaula).subscribe(res => {
        console.log(res);
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'La jaula fue creada correctamente';
        }
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      jaula.id_jaula = this.element.id_jaula
      this.postService.editarJaula(jaula).subscribe(res => {
        console.log(res);
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'La información fue editada correctamente';
        }
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }
  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }

}
