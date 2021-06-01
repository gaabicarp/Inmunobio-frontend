import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios.model';
import { timestamp } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private API_URL = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient ) { }

  obtenerUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API_URL + '/usuarios');
  }

  obtenerUsuariosPorId(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API_URL + `/usuario/${id}`);
  }
  obtenerPermisos(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'permisos');
  }

  obtenerDistribuidoras(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'getDistribuidoras')
  }

  obtenerProductos(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'getProductos')
  }

  // obtenerStock(id_grupo:number, id_espacio: number): Observable<any>{
  //   return this.http.get<any>(this.API_URL + 'obtenerStock/'+ id_grupo + '/'+ id_espacio);
  // }
  // obtenerEspacios(): Observable<any>{
  //   return this.http.get<any>(this.API_URL + 'espaciosFisicos')
  // }
  // obtenerProductoEnStock(): Observable<any>{
  //   return this.http.get<any>(this.API_URL + 'productoEnStock');
  // }

  obtenerGruposExperimentales(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'grupos');
  }
  obtenerMuestras(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'muestras');
  }

  obtenerGrupos(): Observable<any>{
    return this.http .get<any>(this.API_URL + 'gruposDeTrabajo');
  }

  obtenerProyectos(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'proyectos');
  }

  obtenerProyectosPorId(id: number): Observable<any>{
    return this.http.get<any>(this.API_URL + `proyecto/${id}`);
  }

  obtenerExperimentos(idProyecto: number): Observable<any>{
    return this.http.get<any>(this.API_URL + `proyecto/${idProyecto}/experimentos`);
  }

  obtenerExperimentoPorId(idExperimento: number): Observable<any>{
    return this.http.get<any>(this.API_URL + 'experimento/' + idExperimento);
  }

  obtenerUsuarioPorProyecto(idProyecto: number): Observable<any>{
    return this.http.get<any>(this.API_URL + 'obtenerUsuariosProyecto/' + idProyecto);
  }
}
