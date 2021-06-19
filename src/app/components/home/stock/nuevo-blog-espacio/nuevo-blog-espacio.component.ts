import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogEspacio, Blogs } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-blog-espacio',
  templateUrl: './nuevo-blog-espacio.component.html',
  styleUrls: ['./nuevo-blog-espacio.component.css']
})
export class NuevoBlogEspacioComponent implements OnInit {
  @Output() volviendo = new EventEmitter<number>();
  @Input() espacio!: number;

  formBlog!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.alert = false;
    
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
      id_espacioFisico: this.espacio,
      blogs: blog
    }
    this.postService.crearBlogEspacio(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Blog creado correctamente';
        setTimeout(() => {
          this.volviendo.emit(4);
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err.error.error);
    });
  }

  volver(): void{
    this.volviendo.emit(4);
  }

}
