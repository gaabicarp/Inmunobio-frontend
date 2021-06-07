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
    return this.http.post<any>(this.API_URL + '/nuevoUsuario', nuevoUsuario);
  }
  crearExperimento(nuevoExperimento : any): Observable<any>{
    return this.http.post<any>(this.API_URL + '/nuevoExperimento', nuevoExperimento);
  }

  crearDistribuidora(nuevaDistribuidora : any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'distribuidora', nuevaDistribuidora);
  }
  editarDistribuidora(distribuidora: any): Observable<any>{
    return this.http.put<any>(this.API_URL + 'distribuidora', distribuidora);
  }
  eliminarDistribuidora(id: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'distribuidora/' + id);
  }

  crearProducto(nuevoProducto : any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'producto', nuevoProducto);
  }
  editarProducto(producto: any): Observable<any>{
    return this.http.put<any>(this.API_URL + 'producto', producto);
  }
  eliminarProducto(id: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'producto/'+ id);
  }

  subirArchivo(file, id): Observable<string> {
    let formData = new FormData();
    formData.append('detallesTecnicos', file[0]);
    return this.http.post<any>(this.API_URL + 'producto/subirArchivo/'+ id, formData)
  }

  agregarStock(nuevoStock : any){
    return this.http.post<any>(this.API_URL + 'productoEnStock', nuevoStock);
  }
  editarStock(stock : any):Observable<any>{
    return this.http.put<any>(this.API_URL + 'productoEnStock', stock);
  }
  eliminarStock(id_productoEnStock: number, id_productos: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + 'stock/' + id_productoEnStock + '/' + id_productos);
  }

  crearContenedor(nuevoContenedor : any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'nuevoContenedor', nuevoContenedor);
  }
  editarContenedor(contenedor : any):Observable<any>{ // CREO QUE NO SE PUEDE MODIFICAR
    return this.http.put<any>(this.API_URL + '', contenedor);
  }

}
