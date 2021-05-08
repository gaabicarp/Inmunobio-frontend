import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timestamp } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private API_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient ) { }

  obtenerUsuarios(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/usuarios');
  }

  obtenerPermisos(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/permisos');
  }
  obtenerGruposExperimentales(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/grupos')
  }
  obtenerMuestras(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/muestras')
  }
}
