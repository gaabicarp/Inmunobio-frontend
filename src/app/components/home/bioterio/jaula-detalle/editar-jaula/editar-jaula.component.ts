import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jaula } from 'src/app/models/jaula.model';
import { Proyecto } from 'src/app/models/proyectos.model';
import { EspacioFisico } from 'src/app/models/EspacioFisico.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-editar-jaula',
  templateUrl: './editar-jaula.component.html',
  styleUrls: ['./editar-jaula.component.css']
})
export class EditarJaulaComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  idJaula:number;
  jaula:Jaula;
  espaciosFisicos: EspacioFisico[];
  formJaula!: FormGroup;
  mensajeAlert: string;
  alert: any;
  cargando:boolean;
  
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.alert = false;
    this.cargando = true;
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    if (!isNaN(this.idJaula)){
      this.subscription.add( this.getService.obtenerJaulasPorId(this.idJaula).subscribe(res =>{
        this.jaula = res;
        this.cargando = false;
        console.log(res)
      }));
    }
    this.subscription.add( this.getService.obtenerEspaciosFisicos().subscribe(res => {
      this.espaciosFisicos = res;
      this.cargando = false;
      console.log(res);
    }));
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
      this.subscription.add( this.postService.editarJaula(jaula).subscribe(res => {
        console.log(res);
        if (res.status === 'Jaula modificada'){
          this.toastService.show('Informacion editada', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.router.navigate(['/home/bioterio/'+ this.idJaula]);
          }, 1500);
        }
      }, err => {
        this.toastService.show('Problema al editar la información' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
      }));
    } else {
      this.subscription.add( this.postService.crearJaula(jaula).subscribe(res => {
        console.log(res);
        if (res.status === 'Jaula creada.'){
          this.toastService.show('Jaula creada', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.router.navigate(['/home/bioterio']);
          }, 2000);
        }
      }, err => {
        this.toastService.show('Problema al crear la jaula' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
      }));
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
