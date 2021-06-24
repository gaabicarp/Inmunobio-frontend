import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-finalizar-experimento',
  templateUrl: './finalizar-experimento.component.html',
  styleUrls: ['./finalizar-experimento.component.css']
})
export class FinalizarExperimentoComponent implements OnInit {
  obj = {
    conclusion: '',
    resultados: '',
  }
  idExperimento!: number;
  idProyecto!: number;
  mensajeAlert: string;
  estado!: string;
  alert!:boolean;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
  }

  finalizarExperimento(): void {
    const obj = {
      id_experimento: this.idExperimento,
      conclusiones: this.obj.conclusion,
      resultados: this.obj.resultados
    };
    this.postService.cerrarExperimento(obj).subscribe(res => {
        console.log(res)
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'El experimento fue cerrado correctamente';
        setTimeout(() => {
          this.router.navigateByUrl(`home/proyectos/${this.idProyecto}/experimento/${this.idExperimento}`)
        }, 2000);
      }, err => {
        console.log(err)
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.Error);
    });
  }

}
