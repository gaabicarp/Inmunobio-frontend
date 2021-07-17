import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-alta-animal',
  templateUrl: './alta-animal.component.html',
  styleUrls: ['./alta-animal.component.css']
})
export class AltaAnimalComponent implements OnInit {

  formAnimal!: FormGroup;
  idJaula!: string;
  mensajeAlert: string;
  estado: string;
  alert: boolean;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private getService: GetService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.idJaula = this.activatedRouter.snapshot.paramMap.get('id');
    this.formAnimal = new FormGroup({
      especie: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      cepa: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      sexo: new FormControl('', [Validators.maxLength(50)]),
    });
  }

  crearAnimal(): void{
    const animal = this.formAnimal.value;
    animal.id_jaula = this.idJaula;
    console.log(animal)
    this.postService.crearAnimal(animal).subscribe(res => {
      if (res.Status === 'Se creó el nuevo animal.'){
        this.alert = true;
        this.estado = 'success';
        this.mensajeAlert = 'Animal creado correctamente';
        setTimeout(() => {
          this.router.navigate(['/home/bioterio/'+ this.idJaula]);
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alert = true;
      this.estado = 'danger';
      this.mensajeAlert = JSON.stringify(err);
      console.log(err)
    })
  }

}
