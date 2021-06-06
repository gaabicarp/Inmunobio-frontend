import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-bioterio',
  templateUrl: './bioterio.component.html',
  styleUrls: ['./bioterio.component.css']
})
export class BioterioComponent implements OnInit {
  jaulas = [];
  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.getService.obtenerJaulas().subscribe(res => {
      console.log(res);
      this.jaulas = res;
    });
  }

}
