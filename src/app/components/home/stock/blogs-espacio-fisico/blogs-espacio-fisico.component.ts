import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blogs-espacio-fisico',
  templateUrl: './blogs-espacio-fisico.component.html',
  styleUrls: ['./blogs-espacio-fisico.component.css']
})
export class BlogsEspacioFisicoComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Input() blog!: any;
  @Output() volviendo = new EventEmitter<number>();

  step : number;
  blogs = [];
  espacio: number;

  constructor(private getService: GetService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.blog)
    this.step = 5;
    this.subscription.add(this.postService.obtenerBlogEspacioFisico(this.blog).subscribe(res =>{
      console.log(res);
      this.blogs = res; })
    );
  }
  nuevoBlog(){
    this.espacio = this.blog.id_espacioFisico; 
    this.step = 6;
  }
  eliminar(id_blogParametro:number){
    const id_espacioFisico= this.blog.id_espacioFisico;
    const id_blog = id_blogParametro;
    this.postService.eliminarBlogEspacioFisico(id_espacioFisico, id_blog).subscribe(res =>{
      console.log(res);
    })

  }
  volver(): void{
    this.volviendo.emit(0);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }
  

}
