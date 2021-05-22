import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  distribuidoras = [];
  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.getService.obtenerDistribuidoras().subscribe(res =>{
      console.log(res)
      this.distribuidoras = res;
    });
  }
}
