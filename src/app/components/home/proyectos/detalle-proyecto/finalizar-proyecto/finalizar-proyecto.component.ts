import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from '../../../../../services/toast-service.service'

@Component({
  selector: 'app-finalizar-proyecto',
  templateUrl: './finalizar-proyecto.component.html',
  styleUrls: ['./finalizar-proyecto.component.css']
})
export class FinalizarProyectoComponent implements OnInit {
  obj = {
    conclusion: '',
  };
  idProyecto!: number;
  disabledForm:boolean;
  @Output() cerrar = new EventEmitter<any>();

  constructor(
    private postService: PostService, 
    private activatedRouter: ActivatedRoute, 
    private router: Router,
    public toastService: ToastServiceService
    ) { }

  ngOnInit(): void {
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
  }

  finalizarProyecto(): void{
    this.disabledForm = true;
    const obj = {
      id_proyecto: this.idProyecto,
      conclusion: this.obj.conclusion
    };
    this.postService.cerrarProyecto(obj).subscribe(res => {
        this.toastService.show('Proyecto finalizado', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.disabledForm = false;
          this.cerrarModal();
        }, 2000);
      }, err => {
        this.toastService.show('Problema al finalizar Proyecto', { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
        this.disabledForm = false;
        // this.mensajeAlert = JSON.stringify(err.error.error);
    });
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }

}
