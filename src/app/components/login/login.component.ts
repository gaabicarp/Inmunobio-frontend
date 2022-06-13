import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { UsuarioLogin } from 'src/app/models/usuarios.model';
import { PostService } from 'src/app/services/post.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

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


  constructor(private router: Router, 
    private postService: PostService,
    private activatedRouter: ActivatedRoute,
    public toastService: ToastServiceService) {
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

    if (this.loginForm.controls.usuario.value !== '' && this.loginForm.controls.password.value !== ''){
      const loginUser : any = {
        password: this.loginForm.controls.password.value ,
        email: this.loginForm.controls.usuario.value
      }
      console.log("creamos:", loginUser)
      this.postService.obtenerUsuariosPorCredenciales(loginUser).subscribe(res => {
        console.log(res);
        this.toastService.show('Login Success', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.volver();
        }, 2000);
      }, err => {
        this.successMessage = 'Las credenciales no son validas';
        this.cargando = false;
        return;
        // this.toastService.show( 'Las credenciales no son validas' + err.error.error, { classname: 'bg-danger text-light', delay: 2000 });
        // this.cargando = false;
        // return;
      });
    }
    
  }
  volver(): void{
    setTimeout(() => {
      this.router.navigateByUrl('home/proyectos');
    }, 3000);
  }

}
