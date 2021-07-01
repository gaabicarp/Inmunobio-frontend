import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-contenedor',
  templateUrl: './nuevo-contenedor.component.html',
  styleUrls: ['./nuevo-contenedor.component.css']
})
export class NuevoContenedorComponent implements OnInit {
  @Input() element!: any;
  @Input() modo!: string;
  @Output() volver = new EventEmitter();
  proyectos = [];
  espacios =[];

  formContenedor!: FormGroup;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    console.log(this.element)
    this.getService.obtenerProyectos().subscribe(res => {
      console.log(res)
      this.proyectos = res;
    });
    this.getService.obtenerEspaciosFisicos().subscribe(res =>{
      this.espacios = res;
    })
    this.formContenedor = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      descripcion: new FormControl('', [Validators.maxLength(50)]),
      temperatura : new FormControl('', [Validators.maxLength(10)]),
      proyecto: new FormControl('0', [Validators.maxLength(50)]),
      capacidad: new FormControl('', [Validators.maxLength(10)]),
      fichaTecnica: new FormControl('', [Validators.maxLength(30)]),
      espacioFisico: new FormControl('', [Validators.maxLength(30)]),
      disponible: new FormControl('', [Validators.maxLength(10)])
    });
    if (this.modo === 'EDITAR'){
      this.formContenedor.patchValue({
        codigo: this.element.codigo,
        nombre: this.element.nombre,
        descripcion: this.element.descripcion,
        temperatura: this.element.temperatura,
        proyecto: this.element.id_proyecto,
        espacioFisico :  this.element.id_espacioFisico,
        capacidad: this.element.capacidad,
        fichaTecnica: this.element.fichaTecnica,
        disponible: this.element.disponible
      });
    }
  }

  crearContenedor(): void{
    var estado = false;
    var checkbox = document.getElementById('disponible') as HTMLInputElement ;
    var estaTrue = checkbox.checked;
      if(estaTrue){
        estado = true;
      }
    console.log(estado)
    const contenedor: any = {
      codigo: this.formContenedor.value.codigo,
      nombre: this.formContenedor.value.nombre,
      descripcion: this.formContenedor.value.descripcion,
      id_proyecto: this.formContenedor.value.proyecto,
      id_espacioFisico : this.formContenedor.value.espacioFisico,
      capacidad: this.formContenedor.value.capacidad,
      temperatura: this.formContenedor.value.temperatura,
      fichaTecnica: this.formContenedor.value.fichaTecnica,
      disponible: estado
    };
    console.log(contenedor)
    if (this.modo === 'CREAR'){
      this.postService.crearContenedor(contenedor).subscribe(res => {
        console.log(res);
      });
    } else {
      contenedor.id_contenedor = this.element.id_contenedor
      this.postService.editarContenedor(contenedor).subscribe(res => {
        console.log(res);
      });
    }
  }
  
  onVolver(): void{
    this.volver.emit();
  }
}
