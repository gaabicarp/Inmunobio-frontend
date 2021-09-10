import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BlogEspacio, BlogHerramienta } from 'src/app/models/blogs.model';
import { Herramienta } from 'src/app/models/herramientas.model';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-blog-espacio-herramienta',
  templateUrl: './blog-espacio-herramienta.component.html',
  styleUrls: ['./blog-espacio-herramienta.component.css']
})
export class BlogEspacioHerramientaComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  disabledForm: boolean;
  tipoBlog= 'espacioFisico';
  herramientaSeleccionadaBlog:any;
  usuario:any;
  detalleBlog:string;
  idEspacioFisico:number;
  herramientasFiltradas: Herramienta[] =[];
  cargando:boolean;
  constructor(
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal,
    public toastService: ToastServiceService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.idEspacioFisico = parseInt(this.activatedRouter.snapshot.paramMap.get('idEspacio'), 10);
    this.subscription.add( this.getService.obtenerHerramientas().subscribe(res => {
      if(res){
        this.herramientasFiltradas =  res.filter(herramienta => {
          return herramienta.id_espacioFisico == this.idEspacioFisico;
        });
        this.cargando = false;
      } else{
        this.herramientasFiltradas = [];
        this.toastService.show('Hubo un error',{ classname: 'bg-danger text-light', delay: 2000 });
        this.cargando = false;
      }
      console.log(res)
       })
    );
  }
  crearBlog(){
    this.disabledForm = true;
    if(this.tipoBlog === 'herramienta'){
      const nuevoBlog : BlogHerramienta ={
        id_herramienta: this.herramientaSeleccionadaBlog,
        blogs:{
          id_usuario: this.usuario.id,
          detalle: this.detalleBlog,
          tipo :'herramienta'
        }
      }
      console.log(nuevoBlog)
      this.subscription.add( this.postService.crearBlogHerramienta(nuevoBlog).subscribe(res => {
        if (res.Status === 'Se creo el blog de herramienta'){
          this.toastService.show('Blog creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.detalleBlog = '';
            this.toastService.removeAll()
            this.modalService.dismissAll()
            this.disabledForm = false;
            this.ngOnInit()
          }, 2000);
        }
        console.log(res)
      }, err => {
        this.toastService.show( 'Problema al crear el blog '+err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
        this.disabledForm = false;
      }));
    } else{
      const nuevoBlog : BlogEspacio = {
        id_espacioFisico: this.idEspacioFisico,
        blogs: {
          id_usuario: this.usuario.id,
          detalle: this.detalleBlog,
          tipo :'espacioFisico'
        }
      }
      this.subscription.add( this.postService.crearBlogEspacio(nuevoBlog).subscribe(res => {
        if (res.Status === 'Se creó blog de espacio físico.'){
          this.toastService.show('Blog creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.detalleBlog = '';
            this.toastService.removeAll()
            this.modalService.dismissAll()
            this.disabledForm = false;
            this.ngOnInit()
          }, 2000);
        }
        console.log(res)
      }, err => {
        this.toastService.show( 'Problema al crear el blog '+err.error.Error, { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err)
        setTimeout(() => {
          this.toastService.removeAll()
          this.disabledForm = false;
        }, 3000);
      }));
    }
  }

}
