import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-detalle-experimentos',
  templateUrl: './detalle-experimentos.component.html',
  styleUrls: ['./detalle-experimentos.component.css']
})
export class DetalleExperimentosComponent implements OnInit {
  
  idProyecto!: number;
  idExperimento!: number;
  proyecto: any;
  experimento: any;
  gruposExperimentales = [];
  formGrupoExperimental: FormGroup;
  agregarGrupo: boolean;
  detalleBlog: string;
  fechaHoy: any;
  fechaDesde: any;
  fechaHasta: any;
  blogs = [];
  filterPost:string;
  filterPostActive: number;

  fecHoy=new Date(Date.now());
  fecDesde:any;
  fecHasta:any;
  disabledForm: boolean;

  constructor(
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal,
    public toastService: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.filterPost = '';
    this.filterPostActive = -1;
    this.agregarGrupo = false;
    this.formGrupoExperimental = new FormGroup({
      tipo: new FormControl('0', Validators.required),
      codigo: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
    });
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.idExperimento = parseInt(this.activatedRouter.snapshot.paramMap.get('idExperimento'), 10);
    this.getService.obtenerProyectosPorId(this.idProyecto).subscribe(res => {
      // console.log(res);
      this.proyecto = res;
    });
    this.getService.obtenerExperimentoPorId(this.idExperimento).subscribe(res => {
      // console.log(res);
      this.experimento = res;
    });
    this.getService.obtenerGruposExperimentalesPorExperimento(this.idExperimento).subscribe(res => {
      // console.log(res);
      res === null ? this.gruposExperimentales = [] : this.gruposExperimentales = res;
      this.gruposExperimentales = this.gruposExperimentales.filter( grupo => grupo.habilitado)
      console.log(this.gruposExperimentales)
    });

    this.fechaDesde = new Date();
    this.fechaDesde.setDate(this.fechaDesde.getDate() - 3);
    // this.fechaDesde = this.fechaDesde.toDateString();
    this.fechaHasta = new Date();

    this.postService.obtenerBlogExperimento({
      id_experimento: this.idExperimento,
      fechaDesde: this.fechaDesde.toDateString(),
      fechaHasta: this.fechaHasta.toDateString()
    }).subscribe(res => {
      console.log(res);
      this.blogs = res;
    });
  }

  crearGrupoExperimental(): void {
    this.disabledForm = true;
    const grupoExperimental = this.formGrupoExperimental.value;
    grupoExperimental.id_experimento = this.idExperimento;
    console.log(grupoExperimental)
    this.postService.crearGrupoExperimental(grupoExperimental).subscribe(res => {
      this.toastService.show('Grupo Experimental creado', { classname: 'bg-success text-light', delay: 2000 });
      setTimeout(() => {
        this.toastService.removeAll()
        this.modalService.dismissAll()
        this.disabledForm = false;
        this.ngOnInit()
      }, 2000);

    }, err => {
      this.toastService.show('Problema al crear Grupo Experimental' + err, { classname: 'bg-danger text-light', delay: 2000 });
      console.log(err)
      this.disabledForm = false;
    });
  }

  open(content): void {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  crearBlog(): void{
    this.disabledForm = true;
    const Blog: any = {
      id_usuario: 1,
      detalle: this.detalleBlog,
      tipo: 'Experimento'
    };
    const nuevoBlog: any = {
      id_proyecto: this.idProyecto,
      id: this.idExperimento,
      blogs: Blog
    };
    // console.log(nuevoBlog)
    this.postService.crearBlogProyecto(nuevoBlog).subscribe(res => {
      console.log(res)
      if (res.Status === 'Se creó el blog de proyecto.'){
        this.toastService.show('Blog creado', { classname: 'bg-success text-light', delay: 2000 });
          setTimeout(() => {
            this.toastService.removeAll()
            this.modalService.dismissAll()
            this.disabledForm = false;
            this.ngOnInit()
          }, 2000);
      }
    }, err => {
      console.log(err)
      this.toastService.show('Problema al crear el blog', { classname: 'bg-danger text-light', delay: 2000 });
    });
  }

  filtrarBlogs(): void{
    this.fecDesde =  new Date(this.fecDesde.year,(this.fecDesde.month -1)  ,this.fecDesde.day)
    const fechaHasta = new Date(this.fecHasta.year,(this.fecHasta.month -1) ,this.fecHasta.day)
    console.log(this.fecDesde, fechaHasta)
    const diaMas1 = (fechaHasta).getDate() + 2;
    this.fecHasta = new Date(fechaHasta.getFullYear(),fechaHasta.getMonth(), diaMas1)
    this.fecDesde = this.fecDesde.toDateString();
    this.fecHasta = this.fecHasta.toDateString();
    const blog : any = {
      id_experimento : this.idExperimento,
      fechaDesde: this.fecDesde,
      fechaHasta: this.fecHasta
    }
    this.postService.obtenerBlogExperimento(blog).subscribe( res =>{
      this.blogs = res;
      console.log(res)
    })
  }

}
