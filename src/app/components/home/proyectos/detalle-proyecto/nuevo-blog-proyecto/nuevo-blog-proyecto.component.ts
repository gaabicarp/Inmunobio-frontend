import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { GetService } from 'src/app/services/get.service';
import { BlogProyecto, Blogs } from 'src/app/models/blogs.model';
import { Jaula } from 'src/app/models/jaula.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nuevo-blog-proyecto',
  templateUrl: './nuevo-blog-proyecto.component.html',
  styleUrls: ['./nuevo-blog-proyecto.component.css']
})
export class NuevoBlogProyectoComponent implements OnInit {
  id_proyecto!: number;
  formBlog! : FormGroup;
  jaulas: Jaula;
  experimentos = [];

  mensajeAlert: string;
  estado: string;
  alert: boolean;
  constructor(private postService: PostService, private getService: GetService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_proyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    console.log(this.id_proyecto);
    this.formBlog = new FormGroup({
      detalle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      tipo: new FormControl('', []),
      id: new FormControl('',[] )
    });
    this.getService.obtenerJaulasPorProyecto(this.id_proyecto).subscribe(res =>{
      this.jaulas = res;
      console.log(res)
    })
    this.getService.obtenerExperimentos(this.id_proyecto).subscribe(res =>{
      this.experimentos = res;
      console.log(res)
    })
  }
  crearBlog(){
    const Blog: Blogs={
      id_usuario: 1,
      detalle: this.formBlog.value.detalle,
      tipo: this.formBlog.value.tipo
    }
    const nuevoBlog : any ={
      id_proyecto: this.id_proyecto,
      id: this.formBlog.value.id,
      blogs: Blog
    }
    console.log(nuevoBlog)
    this.postService.nuevoBlogProyecto(nuevoBlog).subscribe(res =>{
      console.log(res)
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Blog creado correctamente';
      }
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    })
  }
 
}
