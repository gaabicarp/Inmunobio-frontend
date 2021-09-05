import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuarios.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
  element!: any;
  modo!: string;
  mensajeAlert: string;
  alert!: boolean;
  estado!: string;
  cargando: boolean;


  formProyecto!: FormGroup;
  idProyecto!: number;
  directoresProyecto = [];
  usuariosDisponibles = [];

  itemList: any = [];
  selectedItems = [];
  settings = {};
  disabledForm: boolean;

  constructor(
    private getService: GetService,
    private postService: PostService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR';

    this.getService.obtenerUsuarios().subscribe(res => {
      if (res){
        console.log(res)
        this.directoresProyecto = res.filter(usuario => {
          return usuario.permisos.some(permiso => permiso.id_permiso === 4);
        });
        this.itemList = res;
        this.usuariosDisponibles = res;
        this.cargando = false;
      } else {
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
    });


    this.settings = {
      text: 'Seleccione usuarios',
      selectAllText: 'Seleccione Todos',
      unSelectAllText: 'Quitar Todos',
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'nombre',
      enableSearchFilter: true,
      searchBy: ['nombre'],
      disabled: false
    };

    this.formProyecto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      codigoProyecto: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      montoInicial: new FormControl(''),
      idDirectorProyecto: new FormControl('-1', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      usuarios: new FormControl([])
    });
    this.cargando = false;
    if (this.modo === 'EDITAR'){
      this.cargando = true;
      this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
      this.getService.obtenerProyectosPorId(this.idProyecto).subscribe(res => {
        if (res){
            // console.log(res);
            this.element = res;
            this.formProyecto.patchValue({
              nombre: this.element.nombre,
              codigoProyecto: this.element.codigoProyecto,
              montoInicial: this.element.montoInicial,
              idDirectorProyecto: this.element.idDirectorProyecto.id,
              descripcion: this.element.descripcion
            });
            this.getService.obtenerUsuarioPorProyecto(this.element.id_proyecto).subscribe(usuarios => {
              const participantes = res.participantes.map(user => user.id);
              console.log(participantes)
              this.selectedItems = usuarios.filter( usuario => participantes.indexOf(usuario.id) > -1);
              this.cargando = false;
            });
            // console.log('asdasd')
            this.itemList = this.usuariosDisponibles.filter(usuario => usuario.id != this.formProyecto.value.idDirectorProyecto);
          this.cargando = false;
        } else {
          this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
          this.cargando = false;
        }
        });
   }
  }

  filtrarDirector(): void {
    const directorSeleccionado = this.formProyecto.value.idDirectorProyecto;
    console.log(directorSeleccionado)
    this.itemList = this.usuariosDisponibles.filter(usuario => usuario.id != directorSeleccionado);
    this.selectedItems = this.selectedItems.filter(usuario => usuario.id != directorSeleccionado);
  }


  crearProyecto(): void {
    this.disabledForm = true;
    const int = [];
    this.selectedItems.map(usuario => {
      int.push(usuario.id);
    });
    const proyecto: any = {
      codigoProyecto: this.formProyecto.value.codigoProyecto,
      nombre: this.formProyecto.value.nombre,
      descripcion: this.formProyecto.value.descripcion,
      participantes: int,
      idDirectorProyecto: JSON.parse(this.formProyecto.value.idDirectorProyecto),
      montoInicial: this.formProyecto.value.montoInicial,
    };

    if (this.modo === 'CREAR'){
      this.postService.crearProyecto(proyecto).subscribe(res => {
          console.log(res);
          this.toastService.show('Proyecto Creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.disabledForm = false;
            this.volver();
          }, 2000);
        }, err => {
          this.toastService.show('Problema al crear Proyecto' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
          this.disabledForm = false;
        });
    } else {
      // console.log(proyecto);
      // console.log(this.formProyecto.status);
      proyecto.id_proyecto = this.idProyecto;
      this.postService.modificarProyecto(proyecto).subscribe(res => {
          console.log(res);
          this.toastService.show('Proyecto Editado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.disabledForm = false;
            this.volver();
          }, 2000);
        }, err => {
          this.toastService.show('Problema al editar Proyecto' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
          this.disabledForm =false;
      });
    }
  }

  volver(): void{
    let ruta;
    this.modo === 'EDITAR' ? ruta = `home/proyectos/${this.idProyecto}` : ruta = 'home/proyectos';
    this.router.navigateByUrl(ruta);
  }

}
