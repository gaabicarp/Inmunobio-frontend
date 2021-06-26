import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-alta-animal',
  templateUrl: './alta-animal.component.html',
  styleUrls: ['./alta-animal.component.css']
})
export class AltaAnimalComponent implements OnInit {
  @Input() element!: any;
  @Output() volviendo = new EventEmitter<number>();

  formAnimal!: FormGroup;
  step:number;

  constructor(private activatedRouter: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.step =3;
    this.formAnimal = new FormGroup({
      especie: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      cepa: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      sexo: new FormControl('', [Validators.maxLength(50)]),
    });
  }

  crearAnimal(): void{
    const animal = this.formAnimal.value;
    animal.id_jaula = this.element;
    this.postService.crearAnimal(animal).subscribe(res => {
      console.log(res)
    })
  }
  volver(): void{
    this.volviendo.emit(2);
  }
  onVolviendo(e: number): void{
    this.step = e;
  }

}
