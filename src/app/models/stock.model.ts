import { DatePipe } from "@angular/common";

export interface Producto {
    lote: string;
    unidad: number;
    codigoContenedor: number;
    detalleUbicacion: string;
    fechaVencimiento: any;
}
export class DatePipeComponent {
    today: number = Date.now();
    }