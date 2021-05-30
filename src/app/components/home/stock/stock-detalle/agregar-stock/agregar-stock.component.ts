import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css']
})
export class AgregarStockComponent implements OnInit {
  // @Input() element!: any;
  // @Input() modo!: string;
  // @Output() volver = new EventEmitter();


  formStock!: FormGroup;


  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    // this.formStock = new FormGroup({
    //   grupo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    //   espacio: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    //   // HAY QUE AGREGAR EL ID PRODUCTO DEPENDIENDO DEL SELECCIONADO
    //   producto: new FormControl('', [Validators.maxLength(50)]),
    //   lote: new FormControl('', [Validators.maxLength(11)]),
    //   unidad: new FormControl('', [Validators.required,Validators.maxLength(30)]),
    //   contenedor: new FormControl('', [Validators.maxLength(11)]),
    //   ubicacion: new FormControl('', [Validators.maxLength(11)]),
    //   vencimiento: new FormControl('', [Validators.maxLength(11)]),
    // });
    // if (this.modo === 'EDITAR'){
    //   this.formStock.patchValue({
    //     grupo: this.element.grupo,
    //     espacio: this.element.espacio,
    //     producto: this.element.producto,
    //     lote: this.element.lote,
    //     unidad: this.element.unidad,
    //     contenedor: this.element.contenedor,
    //     ubicacion: this.element.ubicacion,
    //   });
    // }
  }

  agregarStock(): void{
  //   console.log(this.element);
  //   const stock : any = {
  //     grupo: this.formStock.value.grupo,
  //     espacio: this.formStock.value.espacio,
  //     producto: this.formStock.value.producto,
  //     lote: this.formStock.value.lote,
  //     unidad: this.formStock.value.unidad,
  //     contenedor: this.formStock.value.contenedor,
  //     ubicacion: this.formStock.value.ubicacion
  //   };
  //   if (this.modo === 'CREAR'){
  //     this.postService.crearStock(stock).subscribe(res => {
  //       console.log(res);
  //     });
  //   // } else {
  //   //   this.PostService.editarDistribuidora(stock).subscribe(res => {
  //   //     console.log(res);
  //   //   });
  //   // }
  // }
}
}
