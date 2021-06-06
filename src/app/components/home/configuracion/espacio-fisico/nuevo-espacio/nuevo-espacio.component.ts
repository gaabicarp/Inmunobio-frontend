import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['./nuevo-espacio.component.css']
})
export class NuevoEspacioComponent implements OnInit {
  @Input() element!: any;
  @Input() modo!: string;
  @Output() volviendo = new EventEmitter<number>();

  formEspacio!: FormGroup;
  mensajeAlert: string;
  estado: string;
  alert: boolean;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.alert = false;
    this.formEspacio = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      piso: new FormControl('', [Validators.maxLength(50)]),
      sala: new FormControl('', [Validators.maxLength(50)]),
      descripcion: new FormControl('', [Validators.maxLength(100)])
    });
    if (this.modo === 'EDITAR'){
      this.formEspacio.patchValue({
        nombre: this.element.nombre,
        piso: this.element.piso,
        sala: this.element.sala,
        descripcion: this.element.descripcion
      });
    }
  }

  crearEspacio(): void {
    const espacioFisico = this.formEspacio.value;
    if (this.modo === 'CREAR'){
      this.postService.crearEspacio(espacioFisico).subscribe(res => {
        if (res.Status === 'Jaula creada.'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El espacio fue creado correctamente';
          setTimeout(() => {
            this.volviendo.emit(0);
          }, 2000);
        }
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
      });
    } else {
      espacioFisico.id_espacioFisico = this.element.id_espacioFisico;
      this.postService.editarEspacio(espacioFisico).subscribe(res => {
        if (res.Status === 'ok'){
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El espacio fue editado correctamente';
          setTimeout(() => {
            this.volviendo.emit(0);
          }, 2000);
        }
      });
    }
  }

  volver(): void{
    this.volviendo.emit(0);
  }

}
