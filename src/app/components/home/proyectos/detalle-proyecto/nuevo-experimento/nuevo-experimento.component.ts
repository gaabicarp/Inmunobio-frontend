import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-experimento',
  templateUrl: './nuevo-experimento.component.html',
  styleUrls: ['./nuevo-experimento.component.css']
})
export class NuevoExperimentoComponent implements OnInit {
  formExperimento!: FormGroup;
  grupos = []
  muestras = []
  
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getService.obtenerGruposExperimentales().subscribe(res => {
      this.grupos = res;
    })
    this.getService.obtenerMuestras().subscribe(res => {
      this.muestras = res;
    })
    this.formExperimento = new FormGroup({
      objetivo : new FormControl('', [ Validators.maxLength(150)]),
      inicio : new FormControl('',[]),
      fin : new FormControl('', []),
      resultados :new FormControl('',[Validators.maxLength(100)]),
      metodologia : new FormControl('', [ Validators.maxLength(100)]),
      grupo : new FormControl('', []),
      muestra : new FormControl('',[]),
      conclusion : new FormControl('',[Validators.maxLength(100)]),
      finalizado : new FormControl('', [Validators.maxLength(100)])
    });
  }
    crearExperimento(): void{
      // const grupoSelected = this.grupos.filter(grupo => grupo.id == this.formExperimento.value.grupo)[0];
      // const muestraSelected = this.muestras.filter(muestra => muestra.id == this.formExperimento.value.muestra)[0];
      // const nuevoExperimento = {
      //   objetivo : this.formExperimento.value.objetivo,
      //   inicio : this.formExperimento.value.inicio,
      //   fin : this.formExperimento.value.fin,
      //   resultados: this.formExperimento.value.resultados,
      //   metodologia : this.formExperimento.value.metodologia,
      //   id_grupo: [{
      //     descripcion: 'grupo de prueba',
      //     id: 22
      //   }],
      //   id_muestra: [{
      //     descripcion:'muestra de prueba',
      //     id: 33
      //   }]
      // };
      const nuevoExperimento = {
        id_proyecto : 2,
        metodologia : 'metodologia',
        objetivos : 'objetivos'
      }
      console.log(nuevoExperimento);
    this.postService.crearExperimento(nuevoExperimento).subscribe(res => {
      console.log(res);
    });

    }

}
