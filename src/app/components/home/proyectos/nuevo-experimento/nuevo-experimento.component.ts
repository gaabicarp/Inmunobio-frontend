import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { GetService } from 'src/app/services/get.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nuevo-experimento',
  templateUrl: './nuevo-experimento.component.html',
  styleUrls: ['./nuevo-experimento.component.css']
})
export class NuevoExperimentoComponent implements OnInit {
  formExperimento: FormGroup;
  idProyecto: number;
  idExperimento: number;

  cargando: boolean;
  modo: string;

  constructor(
    private postService: PostService,
    private getService: GetService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public toastService: ToastServiceService
    ) { }

  ngOnInit(): void {
    this.cargando = true;

    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR';

    this.formExperimento = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      metodologia: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      objetivos: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    });

    if (this.modo === 'EDITAR'){
      this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
      this.getService.obtenerExperimentoPorId(this.idExperimento).subscribe(res => {
        this.formExperimento.patchValue({
          codigo: res.codigo,
          metodologia: res.metodologia,
          objetivos: res.objetivos
        });
      });
    }

    this.cargando = false;
  }

  crearExperimento(): void{
    const experimento: any = {
      metodologia: this.formExperimento.value.metodologia,
      objetivos: this.formExperimento.value.objetivos,
      codigo: this.formExperimento.value.codigo,
      id_proyecto: this.idProyecto
    };

    if (this.modo === 'CREAR'){
      this.postService.crearExperimento(experimento).subscribe(res => {
        if (res.Status === 'ok') {
          this.toastService.show('Experimento Creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.volver();
          }, 2000);
        }
      }, err => {
        this.toastService.show('Problema al crear experimento' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
      });
    } else {
      experimento.id_experimento = this.idExperimento;
      this.postService.modificarExperimento(experimento).subscribe(res => {
        if (res.Status === 'ok') {
          this.toastService.show('Experimento Editado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.volver();
          }, 2000);
        }
      }, err => {
        this.toastService.show('Problema al editar experimento' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
      });
    }
  }

  volver(): void{
    this.router.navigateByUrl(this.modo === 'EDITAR' ? `home/proyectos/${this.idProyecto}` : `home/proyectos/${this.idProyecto}`);
  }

}

