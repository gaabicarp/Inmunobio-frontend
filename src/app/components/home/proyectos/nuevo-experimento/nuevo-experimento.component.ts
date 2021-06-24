import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-nuevo-experimento',
  templateUrl: './nuevo-experimento.component.html',
  styleUrls: ['./nuevo-experimento.component.css']
})
export class NuevoExperimentoComponent implements OnInit {
  formExperimento!: FormGroup;
  id_proyecto!: number;
  // agregarAnimal: boolean;
  // animalesProyecto = [];
  // Grupo = [];
  constructor(private postService: PostService, private getService: GetService, private activatedRouter: ActivatedRoute,) { }

  ngOnInit(): void {
    // this.agregarAnimal = false;
    this.id_proyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    // this.getService.obtenerAnimalesPorProyectos(this.id_proyecto).subscribe(res => {
    //   console.log(res);
    //   this.animalesProyecto = res;
    // })
    this.formExperimento = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      metodologia: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      objetivos: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  }

  // crearGrupo(): void {
  //   const obj = {

  //   }
    // if(this.formExperimento.value.tipo === 'animal'){
    //   this.animalesProyecto = this.animalesProyecto.filter(animalSeleccionado => {
    //     return animalSeleccionado !== this.formExperimento.value.animal;
    //   });
    //   // console.log(this.usuariosDisponibles)
    //   // obj = {

    //   // }
    //   this.animalesProyecto.push(this.formExperimento.value.animal);
    // } else {

    // }
  // }

  crearExperimento(): void{
    const experimento = {
      metodologia: this.formExperimento.value.metodologia,
      objetivos: this.formExperimento.value.objetivos,
      codigo: this.formExperimento.value.codigo,
      id_proyecto: this.id_proyecto
    };
    this.postService.crearExperimento(experimento).subscribe(res => {
      console.log(res);
    });
  }

}

