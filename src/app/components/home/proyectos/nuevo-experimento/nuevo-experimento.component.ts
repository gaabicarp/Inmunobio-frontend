import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevo-experimento',
  templateUrl: './nuevo-experimento.component.html',
  styleUrls: ['./nuevo-experimento.component.css']
})
export class NuevoExperimentoComponent implements OnInit {
  formExperimento!: FormGroup;
  id_proyecto!: number;
  constructor(private postService: PostService, private activatedRouter: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id_proyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
    this.formExperimento = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      metodologia: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      objetivos: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  crearExperimento(): void{
    const experimento = {
      metodologia: this.formExperimento.value.metodologia,
      objetivos: this.formExperimento.value.objetivos,
      id_proyecto: this.id_proyecto
    };
    this.postService.crearExperimento(experimento).subscribe(res => {
      console.log(res);
    });
  }

}
