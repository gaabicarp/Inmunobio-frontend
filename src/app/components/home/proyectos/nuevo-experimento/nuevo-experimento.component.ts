import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-experimento',
  templateUrl: './nuevo-experimento.component.html',
  styleUrls: ['./nuevo-experimento.component.css']
})
export class NuevoExperimentoComponent implements OnInit {
  formProyecto!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formProyecto = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      metodologia: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      objetivos: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  crearExperimento(): void{
    console.log('asdasd')
  }

}
