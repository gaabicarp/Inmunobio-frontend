import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

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


  constructor(private router: Router) {
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

    if (this.loginForm.controls.usuario.value !== 'user1' && this.loginForm.controls.password.value !== 'inmunobio'){
      this.successMessage = 'Las credenciales no son validas';
      this.cargando = false;
      return;
    }

    setTimeout(() => {
      this.router.navigateByUrl('home/dashboard');
    }, 3000);
  }
}
