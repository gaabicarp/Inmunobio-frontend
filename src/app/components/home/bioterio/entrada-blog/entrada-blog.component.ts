import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogJaula, Blogs } from 'src/app/models/blogs.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-entrada-blog',
  templateUrl: './entrada-blog.component.html',
  styleUrls: ['./entrada-blog.component.css']
})
export class EntradaBlogComponent implements OnInit {
  @Input() element!: any;
  @Output() volviendo = new EventEmitter<number>();

  formBlogJ!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  step:number;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.alert = false;
    this.step = 4;
    console.log(this.element)
    this.formBlogJ = new FormGroup({
      detalle: new FormControl('', [Validators.maxLength(100)]),
    });
  }
  crearBlogJaula(): void{
    const blog: Blogs ={
      id_usuario: 1,
      detalle: this.formBlogJ.value.detalle,
      tipo :'jaula'
    }
    const nuevoBlog : BlogJaula ={
      id_jaula: this.element,
      blogs: blog
    }
    console.log(nuevoBlog)
    this.postService.nuevoBlogJaula(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Blog creado correctamente';
        setTimeout(() => {
          this.volviendo.emit(3);
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
    this.volviendo.emit(2);
  }

}




  
  
