import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogExperimento, BlogProyecto, Blogs } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-blog-experimento',
  templateUrl: './nuevo-blog-experimento.component.html',
  styleUrls: ['./nuevo-blog-experimento.component.css']
})
export class NuevoBlogExperimentoComponent implements OnInit {
  formBlog!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  idExperimento:number;
  idProyecto:number;
  constructor(private router: Router, private postService: PostService,private getService: GetService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.alert = false;
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    console.log(this.idExperimento)
    this.formBlog = new FormGroup({
      detalle: new FormControl('', [Validators.maxLength(100)]),
    });
  }
  crearBlog(): void{
    const blog: Blogs ={
      id_usuario: 1,
      detalle: this.formBlog.value.detalle,
      tipo :'Experimento'
    }
    const nuevoBlog : BlogProyecto={
      id_proyecto: this.idProyecto,
      id: this.idExperimento,
      blogs: blog
    }
    console.log(nuevoBlog)
    this.postService.nuevoBlogProyecto(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Blog creado correctamente';
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err);
      console.log(err)
    });
  }
}
