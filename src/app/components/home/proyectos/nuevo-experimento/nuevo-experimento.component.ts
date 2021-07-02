import { Component, Input, OnInit } from '@angular/core';
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
  @Input() modo!: string;
  @Input() element!: string;
  formExperimento!: FormGroup;
  idProyecto!: number;
  idExperimento:number;
  experimento:any;
  editar = false;

  constructor(private postService: PostService, private getService: GetService, private activatedRouter: ActivatedRoute,) { }

  ngOnInit(): void {
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    if (!isNaN(this.idExperimento)){
      this.getService.obtenerExperimentoPorId(this.idExperimento).subscribe(res =>{
        this.experimento = res;
        console.log(res)
      })
      this.editar = true;
    }
    this.formExperimento = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      metodologia: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      objetivos: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
    setTimeout(() => {
      if (!isNaN(this.idExperimento)){
        this.formExperimento.patchValue({
          codigo: this.experimento.codigo,
          metodologia: this.experimento.metodologia,
          objetivos: this.experimento.objetivos
        });
      }
    }, 500);
  }

  crearExperimento(): void{
    const experimento: any = {
      metodologia: this.formExperimento.value.metodologia,
      objetivos: this.formExperimento.value.objetivos,
      codigo: this.formExperimento.value.codigo,
      id_proyecto: this.idProyecto
    };
    if (!isNaN(this.idExperimento)){
      experimento.id_experimento = this.idExperimento
      console.log(experimento)
      this.postService.editarExperimento(experimento).subscribe(res =>{
        console.log(res)
      })
    } else {
      this.postService.crearExperimento(experimento).subscribe(res => {
        console.log(res);
      });
    }
  }

}

