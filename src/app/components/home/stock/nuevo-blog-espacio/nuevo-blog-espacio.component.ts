import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogEspacio, BlogHerramienta, Blogs } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-blog-espacio',
  templateUrl: './nuevo-blog-espacio.component.html',
  styleUrls: ['./nuevo-blog-espacio.component.css']
})
export class NuevoBlogEspacioComponent implements OnInit {

  formBlog!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  step: number;
  idEspacioFisico:number;
  herramientas:any;
  herramientasFiltradas:any;

  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.alert = false;
    this.step = 6;
    this.formBlog = new FormGroup({
      detalle: new FormControl('', [Validators.maxLength(200)]),
      tipo: new FormControl(),
      id: new FormControl()
    });
    this.getService.obtenerHerramientas().subscribe(res => {
      console.log(res)
      this.herramientas = res; }
    );
   setTimeout(() => {
      const id = this.idEspacioFisico
      this.herramientasFiltradas =  this.herramientas.filter(function(herramienta) {
        return herramienta.id_espacioFisico == id;
      });
      console.log(this.herramientasFiltradas)
    }, 500);
  }

  crearBlogEspacio(): void{
    if(this.formBlog.value.tipo === 'herramienta'){
      this.crearBlogHerramienta()
    } else{
    const blog: Blogs ={
      id_usuario: 1,
      detalle: this.formBlog.value.detalle,
      tipo :'espacioFisico'
    }
    const nuevoBlog : BlogEspacio ={
      id_espacioFisico: this.idEspacioFisico,
      blogs: blog
    }
    this.postService.crearBlogEspacio(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Blog creado correctamente';
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    });
    }
  }
  crearBlogHerramienta(): void{
    const blog: Blogs ={
      id_usuario: 1,
      detalle: this.formBlog.value.detalle,
      tipo :'herramienta'
    }
    const nuevoBlog : BlogHerramienta ={
      id_herramienta: this.formBlog.value.id,
      blogs: blog
    }
    this.postService.crearBlogHerramienta(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Blog creado correctamente';

      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    });
  }


}
