import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-editar-jaula',
  templateUrl: './editar-jaula.component.html',
  styleUrls: ['./editar-jaula.component.css']
})
export class EditarJaulaComponent implements OnInit {
  espaciosFisicos = [];
  proyectos = [];
  formJaula!: FormGroup;
  mensajeAlert: string;
  estado: string;
  alert: boolean;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getService.obtenerEspaciosFisicos().subscribe(res => {
      this.espaciosFisicos = res;
    });
    this.getService.obtenerProyectos().subscribe(res => {
      this.proyectos = res.filter(proyecto => !proyecto.finalizado );
    });
    this.formJaula = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      rack: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      estante: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      capacidad: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tipo: new FormControl('', [Validators.maxLength(100)]),
      id_espacioFisico: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      id_proyecto: new FormControl('')
    });
  }

  crearJaula(): void{
    let jaula = this.formJaula.value;
    jaula.id_proyecto = parseInt(this.formJaula.value.id_proyecto);
    console.log(jaula)
    this.postService.crearJaula(jaula).subscribe(res => {
      console.log(res)
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'La jaula fue creada correctamente';
      }
    }, err => {
      console.log(err);
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    });
  }

}
