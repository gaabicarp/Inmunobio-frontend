import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios.model';
import { Producto } from '../models/producto.model';
import { timestamp } from 'rxjs/operators';
import { Distribuidora } from '../models/distribuidora.model';
import { Stock } from '../models/stock.model';
import { BlogsBuscados } from '../models/blogs.model';
import { Herramienta } from '../models/herramientas.model';
import { Contenedor } from '../models/contenedores.model';
import { Proyecto } from '../models/proyectos.model';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private API_URL = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient ) { }

  obtenerUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API_URL + 'usuarios');
  }
  obtenerUsuariosPorId(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API_URL + `/usuario/${id}`);

  }

  obtenerPermisos(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'permisos');
  }

  obtenerDistribuidoras(): Observable<Distribuidora>{
    return this.http.get<any>(this.API_URL + 'getDistribuidoras');
  }
  obtenerDistribuidorasPorId(id : number): Observable<any>{
    return this.http.get<any>(this.API_URL + 'distribuidora/' + id);
  }

  obtenerProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.API_URL + 'getProductos');
  }
  obtenerProductosPorId(id : number): Observable<any>{
    return this.http.get<any>(this.API_URL + 'producto/' + id);
  }

  //Hay que poner -->  obtenerStock(id_grupo:number, id_espacio: number): Observable<any>{
  //  return this.http.get<any>(this.API_URL + 'obtenerStock/'+ id_grupo + '/'+ id_espacio);
  obtenerStock(id_espacioFisico : number): Observable<Stock>{
    return this.http.get<any>(this.API_URL + 'obtenerStock/1/'+ id_espacioFisico);
  }
  obtenerContenedores(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'contenedores');
  }

  obtenerContenedoresPorProyecto(idProyecto: number): Observable<any>{
    return this.http.get<any>(this.API_URL + `contenedoresDelProyecto/${idProyecto}`);
  }

  obtenerHerramienta(id_herramienta: number): Observable<Herramienta>{
    return this.http.get<any>(this.API_URL + 'herramienta/'+ id_herramienta);
  }
  obtenerHerramientas():Observable<any>{
    return this.http.get<any>(this.API_URL + 'herramientas');
  }

  obtenerGruposExperimentales(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'grupos');
  }

  obtenerGruposExperimentalesPorExperimento(idExperimento: number): Observable<any>{
    return this.http.get<any>(this.API_URL + `experimento/${idExperimento}/gruposExperimentales`);
  }

  obtenerGruposExperimentalesPorId(idGrupo: number): Observable<any>{
    return this.http.get<any>(this.API_URL + `grupoExperimental/${idGrupo}`);
  }

  obtenerMuestras(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'muestras');
  }

  obtenerGrupos(): Observable<any>{
    return this.http .get<any>(this.API_URL + 'gruposDeTrabajo');
  }

  obtenerGrupoTrabajoPorId(idGrupo: number): Observable<any>{
    return this.http .get<any>(this.API_URL + `grupoDeTrabajo/${idGrupo}`);
  }

  obtenerProyectos(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.API_URL + 'proyectos');
  }

  obtenerProyectosPorId(id: number): Observable<Proyecto>{
    return this.http.get<Proyecto>(this.API_URL + `proyecto/${id}`);
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

  obtenerEspaciosFisicos(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'espaciosFisicos');
  }
  obtenerEspacioFisico(id:number): Observable<any>{
    return this.http.get<any>(this.API_URL + 'espacioFisico/'+ id);
  }

  obtenerJaulas(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'jaulas');
  }

  obtenerJaulasPorId(idJaula: number): Observable<any> {
    return this.http.get<any>(this.API_URL + 'jaula/' + idJaula);
  }

  obtenerJaulasSinProyecto(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/api/v1/jaulasDisponibles');
  }

  obtenerAnimalesPorJaula(idJaula: number): Observable<any> {
    return this.http.get<any>(this.API_URL + `jaula/${idJaula}/animales`);

  }

  obtenerJaulasPorProyecto(idProyecto: number): Observable<any> {
    return this.http.get<any>(this.API_URL + `proyecto/${idProyecto}/jaulasDelProyecto`);
  }

  obtenerAnimalesPorProyectos(idProyecto: number): Observable<any> {
    return this.http.get<any>(this.API_URL + `proyecto/${idProyecto}/animales`);
  }

  obtenerAnimales(): Observable<any> {
    return this.http.get<any>(this.API_URL + `animales`);
  }
}
