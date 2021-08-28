import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private helper = new JwtHelperService();
  constructor(private router: Router, private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string;

    token = localStorage.getItem('token');

    // SIMULA EL TOKEN VENCIDO
    /*
    (async () => {
      // Do something before delay
      console.log('before delay');

      await this.delay(20000);

      // Do something after
      console.log('after delay');
      this.router.navigateByUrl('/login');
      return;

    })();
    */

    let request = req;

    // SI EXISTE CONFIGURA HEADERS DE FUTURAS HTTP
    if (token) {
      console.log(token)
      request = req.clone({
        setHeaders: {
          Authorization: `${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
    }

    // EN CASO DE ERROR 401 (UNAUTHORIZED) REDIRIJE A LOGIN
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // console.log('ERROR 401 (InterceptorService)');
          this.router.navigateByUrl('/login');
          return;
        }

        return throwError(err);
      })
    );
  }

}
