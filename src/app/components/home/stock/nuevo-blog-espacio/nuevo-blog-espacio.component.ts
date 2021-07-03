import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogEspacio, Blogs } from 'src/app/models/blogs.model';
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

  constructor(private getService: GetService, private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.alert = false;
    this.step = 6;
    this.formBlog = new FormGroup({
      detalle: new FormControl('', [Validators.maxLength(50)]),
    });
  }

  crearBlogEspacio(): void{
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
