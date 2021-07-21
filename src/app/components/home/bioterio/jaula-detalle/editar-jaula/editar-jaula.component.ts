import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Jaula } from 'src/app/models/jaula.model';
import { ActivatedRoute } from '@angular/router';

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
  idJaula:number;
  jaula:Jaula;

  constructor(private getService: GetService, private postService: PostService,private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    console.log(this.idJaula)
    if (!isNaN(this.idJaula)){
      this.getService.obtenerJaulasPorId(this.idJaula).subscribe(res =>{
        this.jaula = res;
        console.log(res)
      })
    }
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
      id_espacioFisico: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
    setTimeout(() => {
      if (!isNaN(this.idJaula)){
        this.formJaula.patchValue({
        codigo: this.jaula.codigo,
        rack: this.jaula.rack,
        estante:this.jaula.estante,
        capacidad: this.jaula.capacidad,
        tipo: this.jaula.tipo,
        id_espacioFisico: this.jaula.id_espacioFisico
        });
      }
    }, 500);
    
  }

  crearJaula(): void{
    const jaula : Jaula ={
      codigo: this.formJaula.value.codigo,
      rack : this.formJaula.value.rack,
      estante : this.formJaula.value.estante,
      capacidad:this.formJaula.value.capacidad,
      id_espacioFisico:this.formJaula.value.id_espacioFisico,
      tipo: this.formJaula.value.tipo
    }
    if (!isNaN(this.idJaula)){
      jaula.id_jaula = this.idJaula
      this.postService.editarJaula(jaula).subscribe(res => {
        console.log(res);
        if (res.status === 'Jaula modificada'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'La información fue editada correctamente';
        }
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      this.postService.crearJaula(jaula).subscribe(res => {
        console.log(res);
        if (res.status === 'Jaula creada.'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'La jaula fue creada correctamente';
        }
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }

}
