import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-alta-animal',
  templateUrl: './alta-animal.component.html',
  styleUrls: ['./alta-animal.component.css']
})
export class AltaAnimalComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  idJaula:number;
  formAnimal!: FormGroup;
  mensajeAlert: string;
  alert: any;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.alert = false;
    this.idJaula = parseInt(this.activatedRouter.snapshot.paramMap.get('id'), 10);
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
    this.subscription.add( this.postService.crearAnimal(animal).subscribe(res => {
      if (res.Status === 'Se creó el nuevo animal.'){
        this.alert = 'ok';
        this.mensajeAlert = 'Animal creado correctamente';
        setTimeout(() => {
          this.router.navigate(['/home/bioterio/'+ this.idJaula]);
        }, 2000);
      }
      console.log(res)
    }, err => {
      this.alert = 'error';
      this.mensajeAlert = JSON.stringify(err);
      console.log(err)
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
