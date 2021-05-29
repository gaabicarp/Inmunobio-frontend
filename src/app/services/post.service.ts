import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_URL = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  crearUsuario(nuevoUsuario: any): Observable<any>{
    const header = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    return this.http.post<any>(this.API_URL + 'usuario', nuevoUsuario, {headers: header});
  }

  editarUsuario(usuario: any): Observable<any>{
    return this.http.put<any>(this.API_URL + 'usuario', usuario);
  }

  eliminarUsuario(id: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'usuario');
  }

  crearGrupoTrabajo(grupoTrabajo: any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'grupoDeTrabajo', grupoTrabajo);
  }

  editarGrupoTrabajo(grupoTrabajo: any): Observable<any>{
    return this.http.put<any>(this.API_URL + 'grupoDeTrabajo', grupoTrabajo);
  }

  editarJefeGrupo(grupoTrabajo: any): Observable<any>{
    return this.http.put<any>(this.API_URL + 'nuevoJefeDeGrupo', grupoTrabajo);
  }

  eliminarGrupoTrabajo(grupoTrabajo: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'grupoDeTrabajo');
  }

  crearProyecto(proyecto: any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'nuevoProyecto', proyecto);
  }
}
