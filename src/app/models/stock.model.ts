
export interface ProductoStock {
    lote: string;
    unidad: number;
    codigoContenedor: number;
    detalleUbicacion: string;
    fechaVencimiento: any;
    id_productos?: number;
}
export class Stock{
    id_grupoDeTrabajo: number;
    id_espacioFisico: number;
    id_producto : number;
    id_productoEnStock?: number;
    producto: ProductoStock
}