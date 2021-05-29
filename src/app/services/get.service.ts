import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private API_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient ) { }

  obtenerUsuarios(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/usuarios');
  }

  obtenerUsuariosPorId(id: number): Observable<any>{
    return this.http.get<any>(this.API_URL + `/usuario/${id}`);
  }

  obtenerPermisos(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/permisos');
  }

  obtenerGrupos(): Observable<any>{
    return this.http .get<any>(this.API_URL + '/gruposDeTrabajo');
  }

  obtenerDistribuidoras(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/getDistribuidoras');
  }

  obtenerProyectos(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/proyectos');
  }

  obtenerProyectosPorId(id: number): Observable<any>{
    return this.http.get<any>(this.API_URL + `/proyecto/${id}`);
  }

  obtenerExperimentos(idProyecto: number): Observable<any>{
    return this.http.get<any>(this.API_URL + `/proyecto/${idProyecto}/experimentos`);
  }
}
