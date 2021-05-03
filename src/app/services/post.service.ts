import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  crearUsuario(nuevoUsuario: any): Observable<any>{
    const header = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    return this.http.post<any>(this.API_URL + '/nuevoUsuario', nuevoUsuario, {headers: header});
  }
}
