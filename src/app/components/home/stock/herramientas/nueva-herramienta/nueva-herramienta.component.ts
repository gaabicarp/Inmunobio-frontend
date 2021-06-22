import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Herramienta } from 'src/app/models/herramientas.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nueva-herramienta',
  templateUrl: './nueva-herramienta.component.html',
  styleUrls: ['./nueva-herramienta.component.css']
})
export class NuevaHerramientaComponent implements OnInit {
  @Input() element!: any;
  @Input() modo!: string;
  @Input() id_espacio!: any;
  @Output() volviendo = new EventEmitter<number>();

  step : number;

  formHerramienta!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.step = 7;
    this.alert = false;
    this.formHerramienta = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      detalle: new FormControl('', [Validators.maxLength(100)])
    });
    if (this.modo === 'EDITAR'){
      this.formHerramienta.patchValue({
        nombre: this.element.nombre,
        detalle: this.element.detalle
      });
    }
  }
  nuevaHerramienta(){
    console.log(this.element);
    const herramienta : Herramienta = {
      nombre: this.formHerramienta.value.nombre,
      detalle: this.formHerramienta.value.detalle,
      id_espacioFisico: this.id_espacio
    };
    if (this.modo === 'CREAR'){
      this.postService.crearHerramienta(herramienta).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'Herramienta creada correctamente';
          setTimeout(() => {
            this.volviendo.emit(6);
          }, 2000);
        }
        console.log(res);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      herramienta.id_herramienta = this.element.id_herramienta;
      this.postService.editarHerramienta(herramienta).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'La información fue editada correctamente';
          setTimeout(() => {
            this.volviendo.emit(6);
          }, 2000);
        }
        console.log(res);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }
  volver(): void{
    this.volviendo.emit(6);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }

}
