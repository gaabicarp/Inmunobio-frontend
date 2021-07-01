export interface Jaula{
    codigo: string;
    rack : number;
    estante : number;
    capacidad:number;
    id_jaula?: number;
    id_proyecto?: number;
    nombre_proyecto?: string;
    habilitado?:boolean;
    id_espacioFisico?:number;
    tipo: string;
}
export class TodosBlogsJaulas{
    detalle: string;
    fecha: any;
    id_blog: number;
    id_jaula: number;
    id_usuario:number;
    tipo: string;
}
export class BuscarBlogJaula{
    id_jaula?:number;
    fechaDesde:any;
    fechaHasta:any;
}
export class BlogJaula{
    id_jaula:number;
    blogs: BlogDescripcion
}
export class BlogDescripcion{
    id_usuario: number;
    detalle: string;
    tipo: string;
}