import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables que afectan la alerta
  staticAlertClosed = false;
  successMessage: string;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  cargando: boolean;

  loginForm: FormGroup;


  constructor(private router: Router, private postService: PostService) {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
    this.successMessage = '';
    this.cargando = false;
  }

  login(): void{
    this.cargando = true;
    if (this.loginForm.controls.usuario.value === ''){
      this.successMessage = 'El usuario es requerido';
      this.cargando = false;
      return;
    }

    if (this.loginForm.controls.password.value === ''){
      this.successMessage = 'La contraseña es requerida';
      this.cargando = false;
      return;
    }

    this.postService.login({
        email: this.loginForm.controls.usuario.value,
        password: this.loginForm.controls.password.value
      }).subscribe(res => {
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            this.router.navigateByUrl('home/proyectos');
          }, 3000);
        }, err => {
          this.successMessage = err;
          this.cargando = true;
      });
  }
}
