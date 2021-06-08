// import { Distribuidora } from '../../../../models/distribuidora.model';
// Quise traer la interface que ya tengo creada pero me tira error en la ruta VERRR

export interface Producto{
    id_producto? : number;
    nombre: string;
    marca: string;
    id_distribuidora: number;
    tipo: string;
    aka: string;
    url: string;
    unidadAgrupacion: number;
    detallesTecnicos?: FileList; 
    // creo que esto no va
    protocolo: string;
}
