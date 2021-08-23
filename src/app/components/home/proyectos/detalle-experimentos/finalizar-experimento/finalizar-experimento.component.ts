import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-finalizar-experimento',
  templateUrl: './finalizar-experimento.component.html',
  styleUrls: ['./finalizar-experimento.component.css']
})
export class FinalizarExperimentoComponent implements OnInit {
  obj = {
    conclusion: '',
    resultados: '',
  };
  idExperimento!: number;
  idProyecto!: number;
  disabledForm: boolean;
  @Output() cerrar = new EventEmitter<any>();

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
  }

  finalizarExperimento(): void {
    this.disabledForm = true;
    const obj = {
      id_experimento: this.idExperimento,
      conclusiones: this.obj.conclusion,
      resultados: this.obj.resultados
    };
    this.postService.cerrarExperimento(obj).subscribe(res => {
      this.toastService.show('Experimento finalizado', { classname: 'bg-success text-light', delay: 2000 });
      setTimeout(() => {
        this.cerrarModal();
        this.toastService.removeAll()
        this.disabledForm = false;
        this.router.navigate(['/home/proyectos/' + this.idProyecto]);
      }, 2000);
      }, err => {
        this.toastService.show('Problema al finalizar experimento' + err, { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
        this.disabledForm = false;

    });
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }

}
