import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Distribuidora } from '../models/distribuidora.model';
import { Producto } from '../models/producto.model';
import { Consumir, Stock, StockEdicion } from '../models/stock.model';
import { postUsuario, Usuario } from '../models/usuarios.model';
import { BlogEspacio, BlogHerramienta, Blogs, BlogsBuscados, BlogsBuscadosHerr } from '../models/blogs.model';
import { Herramienta } from '../models/herramientas.model';
import { Contenedor } from '../models/contenedores.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_URL = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  crearUsuario(nuevoUsuario: postUsuario): Observable<any>{
    const header = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    return this.http.post<any>(this.API_URL + 'usuario', nuevoUsuario, {headers: header});
  }

  editarUsuario(usuario: postUsuario): Observable<any>{
    return this.http.put<any>(this.API_URL + 'usuario', usuario);
  }

  eliminarUsuario(id: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'usuario/' + id );
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

  crearExperimento(experimento: any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'nuevoExperimento', experimento);
  }

  crearDistribuidora(nuevaDistribuidora: Distribuidora): Observable<any>{
    return this.http.post<any>(this.API_URL + 'distribuidora', nuevaDistribuidora);
  }
  editarDistribuidora(distribuidora: Distribuidora): Observable<any>{
    return this.http.put<any>(this.API_URL + 'distribuidora', distribuidora);
  }
  eliminarDistribuidora(id: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'distribuidora/' + id);
  }

  crearProducto(nuevoProducto: Producto): Observable<any>{
    return this.http.post<any>(this.API_URL + 'producto', nuevoProducto);
  }
  editarProducto(producto: Producto): Observable<any>{
    return this.http.put<any>(this.API_URL + 'producto', producto);
  }
  eliminarProducto(id: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'producto/' + id);
  }

  subirArchivo(file, id): Observable<string> {
    const formData = new FormData();
    formData.append('detallesTecnicos', file[0]);
    return this.http.post<any>(this.API_URL + 'producto/subirArchivo/' + id, formData);
  }

  crearEspacio(espacio: any): Observable<any> {
    return this.http.post<any>(this.API_URL + 'espacioFisico', espacio);
  }

  editarEspacio(espacio: any): Observable<any> {
    return this.http.put<any>(this.API_URL + 'espacioFisico', espacio);
  }

  crearJaula(jaula: any): Observable<any> {
    return this.http.post<any>(this.API_URL + 'nuevaJaula', jaula);
  }

  agregarStock(nuevoStock : Stock){
    return this.http.post<any>(this.API_URL + 'productoEnStock', nuevoStock);
  }
  editarStock(stock : StockEdicion):Observable<any>{
    return this.http.put<any>(this.API_URL + 'productoEnStock', stock); 
  }
  eliminarStock(id_productoStock: number, id_productos: number): Observable<any>{ 
    return this.http.delete<any>(this.API_URL + 'stock/' + id_productoStock + '/' + id_productos);
  }
  consumirStock(stock: Consumir): Observable<any>{
    return this.http.put<any>(this.API_URL + 'consumirStock', stock);
  }

  crearContenedor(nuevoContenedor : Contenedor): Observable<any>{
    return this.http.post<any>(this.API_URL + 'nuevoContenedor', nuevoContenedor);
  }
  editarContenedor(contenedor : Contenedor):Observable<any>{ // CREO QUE NO SE PUEDE MODIFICAR
    return this.http.put<any>(this.API_URL + '', contenedor);
  }

  crearAnimal(animal: any): Observable<any> {
    return this.http.post<any>(this.API_URL + 'nuevoAnimal', animal);
  }

  cerrarProyecto(obj: any): Observable<any> {
    return this.http.put<any>(this.API_URL + 'cerrarProyecto', obj);
  }

  modificarProyecto(obj: any): Observable<any> {
    return this.http.put<any>(this.API_URL + 'modificarProyecto', obj);
  }

  cerrarExperimento(obj: any): Observable<any> {
    return this.http.put<any>(this.API_URL + 'cerrarExperimento', obj);
  }

  crearGrupoExperimental(obj: any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'nuevoGrupoExperimental', obj);
  }

  crearFuenteExperimental(obj: any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'nuevasFuentesExperimentales', obj);
  }
  
  crearBlogEspacio(nuevo: BlogEspacio):Observable<any> {
    return this.http.post<any>(this.API_URL + 'crearBlogEspacio', nuevo);
  }
  obtenerBlogEspacioFisico(blog: BlogsBuscados): Observable<any>{
    return this.http.post<any>(this.API_URL + 'blogsEspacio',blog);
  }
  eliminarBlogEspacioFisico(id_espacio: number, id_blog: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'borrarBlogEspacio/' + id_espacio + '/'+ id_blog);
  }

  crearHerramienta(nuevaHerramienta: Herramienta): Observable<any>{
    return this.http.post<any>(this.API_URL + 'herramienta', nuevaHerramienta);
  }
  editarHerramienta( herramienta:Herramienta ): Observable<any>{
    return this.http.put<any>(this.API_URL + 'herramienta', herramienta);
  }
  eliminarHerramienta(id_herramienta:number):Observable<any>{
    return this.http.delete<any>(this.API_URL + 'herramienta/' + id_herramienta);
  }
  crearBlogHerramienta(nuevo: BlogHerramienta):Observable<any>{
    return this.http.post<any>(this.API_URL + 'crearBlogHerramienta', nuevo);
  }
  eliminarBlogHerramienta(id_herramienta: number, id_blog: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'blogHerramienta/' + id_herramienta + '/'+ id_blog);
  }
  obtenerBlogHerramientas(blog: BlogsBuscadosHerr): Observable<any>{
    return this.http.post<any>(this.API_URL + 'blogHerramienta', blog);
  }

  crearMuestra(muestra: any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'nuevaMuestra', muestra);
  }

}
