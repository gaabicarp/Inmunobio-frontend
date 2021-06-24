import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-finalizar-proyecto',
  templateUrl: './finalizar-proyecto.component.html',
  styleUrls: ['./finalizar-proyecto.component.css']
})
export class FinalizarProyectoComponent implements OnInit {
  obj = {
    conclusion: '',
  }
  idProyecto!: number;
  mensajeAlert: string;
  estado!: string;
  alert!:boolean;

  constructor(private postService: PostService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
  }

  finalizarProyecto(): void{
    const obj = {
      id_proyecto: this.idProyecto,
      conclusion: this.obj.conclusion
    };
    this.postService.cerrarProyecto(obj).subscribe(res=>{
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'El proyecto fue cerrado correctamente';
        setTimeout(() => {
          this.router.navigateByUrl('home/proyectos')
        }, 2000);
      }, err => {
        this.alert = true;
        this.estado = 'danger';
        this.mensajeAlert = JSON.stringify(err.error.error);
    });
  }

}
