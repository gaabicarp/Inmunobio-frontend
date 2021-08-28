import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private router: Router) { }

  public chageLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.chageLoginStatusSubject.asObservable();

  login(tk: string): void {
    localStorage.setItem('token', tk);
    this.chageLoginStatusSubject.next(true);
  }

  logout(): void {
    const user = localStorage.getItem('username');
    localStorage.clear();
    if (user !== null && user !== '') {
      localStorage.setItem('username', user);
    }
    this.chageLoginStatusSubject.next(false);
    this.router.navigateByUrl('/login');
  }

  token(escore: boolean): string {
    if (
      localStorage.getItem('token') === '' ||
      localStorage.getItem('token') === null
    ) {
      return '';
    } else {
      // console.log(localStorage.getItem('token').length);
      // console.log(escore);
      if (
        escore
        // localStorage.getItem('token').length === 346 ||
        // localStorage.getItem('token').length === 352
      ) {
        return localStorage.getItem('token');
      } else {
        // console.log(localStorage.getItem('token').substring(22));
        return localStorage.getItem('token');
      }
    }
  }
}
