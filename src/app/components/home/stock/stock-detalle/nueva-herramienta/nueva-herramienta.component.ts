import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Herramienta } from 'src/app/models/herramientas.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nueva-herramienta',
  templateUrl: './nueva-herramienta.component.html',
  styleUrls: ['./nueva-herramienta.component.css']
})
export class NuevaHerramientaComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  formHerramienta!: FormGroup;
  cargando: boolean;
  idEspacioFisico:number;
  idHerramienta:number;
  herramienta:Herramienta;
  editar=false ;
  disabledForm: boolean;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.idHerramienta = parseInt(this.activatedRouter.snapshot.paramMap.get('idHerramienta'), 10);
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
    this.disabledForm = true;
    const herramienta : Herramienta = {
      nombre: this.formHerramienta.value.nombre,
      detalle: this.formHerramienta.value.detalle,
      id_espacioFisico: this.idEspacioFisico
    };
    if (!isNaN(this.idHerramienta) ){
      herramienta.id_espacioFisico  = this.idEspacioFisico;
      herramienta.id_herramienta = this.idHerramienta;
      this.subscription.add( this.postService.editarHerramienta(herramienta).subscribe(res => {
        if (res.Status === 'Se modifico la herramienta'){
          this.toastService.show('Información editada', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
            this.disabledForm = false;
            this.router.navigate(['/home/stock/'+ this.idEspacioFisico]);
          }, 1000);
        }
        console.log(res);
      }, err => {
        this.toastService.show( 'Problema al editar la información '+err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
        setTimeout(() => {
          this.toastService.removeAll()
          this.disabledForm = false;
        }, 3000);

      }));
    } else {
      this.subscription.add( this.postService.crearHerramienta(herramienta).subscribe(res => {
        if (res.Status === 'Se creo la nueva herramienta'){
          this.toastService.show('Herramienta creada', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
            this.disabledForm = false;
            this.router.navigate(['/home/stock/'+ this.idEspacioFisico]);
          }, 2000);
        }
        console.log(res);
      }, err => {
        this.toastService.show('Problema al crear la herramienta '+ err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
        setTimeout(() => {
          this.toastService.removeAll()
          this.disabledForm = false;
        }, 3000);
      }));
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
