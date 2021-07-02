import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogJaula } from 'src/app/models/jaula.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-entrada-blog',
  templateUrl: './entrada-blog.component.html',
  styleUrls: ['./entrada-blog.component.css']
})
export class EntradaBlogComponent implements OnInit {

  formBlogJ!: FormGroup;
  estado: string;
  mensajeAlert: string;
  alert: boolean;
  idJaula:number;

  constructor(private router: Router, private postService: PostService,private getService: GetService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.alert = false;
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    console.log(this.idJaula)
    this.formBlogJ = new FormGroup({
      detalle: new FormControl('', [Validators.maxLength(100)]),
    });
  }
  crearBlogJaula(): void{
    const blog: Blogs ={
      id_usuario: 1,
      detalle: this.formBlogJ.value.detalle,
      tipo :'Jaula'
    }
    const nuevoBlog : BlogJaula={
      id_jaula: this.idJaula,
      blogs: blog
    }
    console.log(nuevoBlog)
    this.postService.nuevoBlogJaula(nuevoBlog).subscribe(res => {
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




  
  
