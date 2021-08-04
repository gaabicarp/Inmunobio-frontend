import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Herramienta } from 'src/app/models/herramientas.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nueva-herramienta',
  templateUrl: './nueva-herramienta.component.html',
  styleUrls: ['./nueva-herramienta.component.css']
})
export class NuevaHerramientaComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  formHerramienta!: FormGroup;
  cargando: boolean;
  mensajeAlert: string;
  alert: any ;
  idEspacioFisico:number;
  idHerramienta:number;
  herramienta:Herramienta;
  editar=false ;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.alert = false;
    this.cargando = true;
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.idHerramienta = parseInt(this.activatedRouter.snapshot.paramMap.get('idHerramienta'), 10);
    this.alert = false;
    if (!isNaN(this.idHerramienta)){
      this.subscription.add( this.getService.obtenerHerramienta(this.idHerramienta).subscribe(res =>{
        this.herramienta = res;
        this.cargando = false;
        console.log(res)
      }));
      this.editar =true;
    }
    this.cargando = false;
    this.formHerramienta = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      detalle: new FormControl('', [Validators.maxLength(100)])
    });
    setTimeout(() => {
      if (!isNaN(this.idHerramienta)) {
        this.formHerramienta.patchValue({
          nombre: this.herramienta.nombre,
          detalle: this.herramienta.detalle
        });
      }
    }, 500);
  }
  nuevaHerramienta(){
    const herramienta : Herramienta = {
      nombre: this.formHerramienta.value.nombre,
      detalle: this.formHerramienta.value.detalle,
      id_espacioFisico: this.idEspacioFisico
    };
    if (!isNaN(this.idHerramienta) ){
      herramienta.id_espacioFisico  = this.idEspacioFisico;
      herramienta.id_herramienta = this.idHerramienta;
      this.subscription.add( this.postService.editarHerramienta(herramienta).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert ='ok';
          this.mensajeAlert = 'La información fue editada correctamente';
          setTimeout(() => {
            this.router.navigate(['/home/stock/'+ this.idEspacioFisico]);
          }, 1000);
        }
        console.log(res);
      }, err => {
        this.alert = 'error';
        this.mensajeAlert = JSON.stringify(err.error.error);
      }));
    } else {
      this.subscription.add( this.postService.crearHerramienta(herramienta).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = 'ok';
          this.mensajeAlert = 'Herramienta creada correctamente';
          setTimeout(() => {
            this.router.navigate(['/home/stock/'+ this.idEspacioFisico]);
          }, 1000);
        }
        console.log(res);
      }, err => {
        this.alert = 'error';
        this.mensajeAlert = JSON.stringify(err.error.error);
      }));
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}