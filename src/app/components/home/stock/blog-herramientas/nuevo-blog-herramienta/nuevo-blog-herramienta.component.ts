import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogEspacio, BlogHerramienta, Blogs } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-blog-herramienta',
  templateUrl: './nuevo-blog-herramienta.component.html',
  styleUrls: ['./nuevo-blog-herramienta.component.css']
})
export class NuevoBlogHerramientaComponent implements OnInit {
  formBlogH!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  step:number;
  idHerramienta:number;

  constructor(private postService: PostService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.alert = false;
    this.idHerramienta = parseInt(this.activatedRouter.snapshot.paramMap.get('idHerramienta'), 10);
    this.formBlogH = new FormGroup({
      detalle: new FormControl('', [Validators.maxLength(100)]),
    });
  }

  crearBlogHerramienta(): void{
    const blog: Blogs ={
      id_usuario: 1,
      detalle: this.formBlogH.value.detalle,
      tipo :'herramienta'
    }
    const nuevoBlog : BlogHerramienta ={
      id_herramienta: this.idHerramienta,
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
