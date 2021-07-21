import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

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
  detalleExperimento: string;
  fechaHoy: any;
  fechaDesde: any;
  fechaHasta: any;
  blogs = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.agregarGrupo = false;
    this.formGrupoExperimental = new FormGroup({
      tipo: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
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
    const grupoExperimental = this.formGrupoExperimental.value;
    grupoExperimental.id_experimento = this.idExperimento;
    this.postService.crearGrupoExperimental(grupoExperimental).subscribe(res => {
      console.log(res);
    });
  }

  open(content): void {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  crearBlog(): void{
    const Blog: any = {
      id_usuario: 1,
      detalle: this.detalleExperimento,
      tipo: 'Experimento'
    };
    const nuevoBlog: any = {
      id_proyecto: this.idProyecto,
      id: this.idExperimento,
      blogs: Blog
    };
    // console.log(nuevoBlog)
    this.postService.crearBlogProyecto(nuevoBlog).subscribe(res => {
      if (res.Status === 'ok'){
        // this.alert = true;
        // this.estado = 'success';
        // this.mensajeAlert = 'Blog creado correctamente';
      }
    }, err => {
      // console.log(err)
      // this.alert = true;
      // this.estado = 'danger';
      // this.mensajeAlert = JSON.stringify(err.error.error);
    });
  }

  filtrarBlogs(): void{
    this.postService.obtenerBlogExperimento({
      id_experimento: this.idExperimento,
      fechaDesde: new Date(this.fechaDesde.year, this.fechaDesde.month - 1, this.fechaDesde.day).toDateString(),
      fechaHasta: new Date(this.fechaHasta.year, this.fechaHasta.month - 1, this.fechaHasta.day).toDateString()
    }).subscribe(res => {
      console.log(res);
      this.blogs = res;
    });
  }

}
