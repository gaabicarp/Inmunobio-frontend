import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogEspacio, BlogHerramienta, Blogs } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-blog-herramienta',
  templateUrl: './nuevo-blog-herramienta.component.html',
  styleUrls: ['./nuevo-blog-herramienta.component.css']
})
export class NuevoBlogHerramientaComponent implements OnInit {
  @Output() volviendo = new EventEmitter<number>();
  @Input() herramienta!: number;

  formBlogH!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  step:number;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.alert = false;
    this.step = 10;
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
      id_herramienta: this.herramienta,
      blogs: blog
    }
    this.postService.crearBlogHerramienta(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Blog creado correctamente';
        setTimeout(() => {
          this.volviendo.emit(0);
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
    this.volviendo.emit(9);
  }

}
