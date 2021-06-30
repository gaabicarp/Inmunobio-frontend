import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuarios.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

  formProyecto!: FormGroup;
  idProyecto!: number;
  directoresProyecto = [];
  usuariosDisponibles = [];
  usuariosAsignados = [];

  itemList:any = [];
  selectedItems = [];
  settings = {};

  constructor(
    private getService: GetService,
    private postService: PostService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getService.obtenerUsuarios().subscribe(res => {
      console.log(res);
      this.directoresProyecto = res.filter(usuario => {
        return usuario.permisos.some(permiso => permiso.id_permiso === 4);
      });

      this.itemList = res;
      // this.selectedItems = [];
      // res.map(item => {
      //   const obj = {id: item.id_usuario, itemName: item.nombre};
      //   this.itemList.push(obj);
      // });
      // this.dropdownList = res;
      // this.usuariosDisponibles = res;
      // console.log(this.directoresProyecto)
    });

    
    // this.itemList = [
    //   { id: 1, itemName: "India" },
    //   { id: 2, itemName: "Singapore" },
    //   { id: 3, itemName: "Australia" },
    //   { id: 4, itemName: "Canada" },
    //   { id: 5, itemName: "South Korea" },
    //   { id: 6, itemName: "Brazil" }
    // ];

    this.settings = {
      text: "Seleccione usuarios",
      selectAllText: 'Seleccione Todos',
      unSelectAllText: 'Quitar Todos',
      classes: "myclass custom-class",
      primaryKey: "id_usuario",
      labelKey: "nombre",
      enableSearchFilter: true,
      searchBy: ['nombre']
    };

    window.location.href.includes('editar') ? this.modo = 'EDITAR' : this.modo = 'CREAR';
    this.formProyecto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      codigoProyecto: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      montoInicial: new FormControl(''),
      idDirectorProyecto: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      usuarios: new FormControl([])
    });
    this.getService.obtenerUsuarios().subscribe(res => {
      console.log(res);
      this.directoresProyecto = res.filter(usuario => {
        return usuario.permisos.some(permiso => permiso.id_permiso === 4);
      });
    });



    if (this.modo === 'EDITAR'){
      this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
      this.getService.obtenerProyectosPorId(this.idProyecto).subscribe(res => {
        console.log(res)
        this.element = res;
        this.formProyecto.patchValue({
          nombre: this.element.nombre,
          codigoProyecto: this.element.codigoProyecto,
          montoInicial: this.element.montoInicial,
          idDirectorProyecto: this.element.idDirectorProyecto,
          descripcion: this.element.descripcion
        });
        this.getService.obtenerUsuarioPorProyecto(this.element.id_proyecto).subscribe(usuarios => {
          this.selectedItems = usuarios.filter(usuario => res.participantes.indexOf(usuario.id_usuario) > -1);
      });
    });
   }
  }

  crearProyecto(): void {
    const int = [];
    this.selectedItems.map(usuario => {
      int.push(usuario.id_usuario);
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
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El proyecto fue creado correctamente';
          setTimeout(() => {
            this.volver();
          }, 2000);
        }, err => {
          this.alert = true;
          this.estado = 'danger';
          this.mensajeAlert = JSON.stringify(err.error.error);
        });
    } else {
      console.log(proyecto)
      console.log(this.formProyecto.status)
      proyecto.id_proyecto = this.idProyecto;
      this.postService.modificarProyecto(proyecto).subscribe(res =>{
          this.alert = true;
          this.estado = 'success';
          this.mensajeAlert = 'El proyecto fue editado correctamente';
          setTimeout(() => {
            this.volver();
          }, 2000);
        }, err => {
          this.alert = true;
          this.estado = 'danger';
          this.mensajeAlert = JSON.stringify(err.error.error);
      });
    }
  }

  volver(): void{
    let ruta;
    this.modo === 'EDITAR' ? ruta = `home/proyectos/${this.idProyecto}` : ruta = 'home/proyectos';
    this.router.navigateByUrl(ruta);
  }

}
