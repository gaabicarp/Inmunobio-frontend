
export class BlogEspacio{
    id_espacioFisico: number;
    blogs: Blogs
}
export class BlogHerramienta{
    id_herramienta:number;
    blogs: Blogs
}
export class BlogJaula{
    id_jaula:number;
    blogs: Blogs
}
export class Blogs{
    id_usuario: number;
    detalle: string;
    tipo: string;
}
export class BlogsBuscados{
    id_espacioFisico: number;
    fechaDesde: any;
    fechaHasta:any;
}
export class BlogsBuscadosHerr{
    id_herramienta:number;
    fechaDesde: any;
    fechaHasta:any;
}
export class BlogsJaula{
    codigoJaula: string;
    detalle: string;
    fecha: any;
    id_blog: number;
    id_jaula: number;
    id_usuario: number;
    tipo: string;
}
export class BlogBuscadoJaula{
    id_jaula:number;
    fechaDesde: any;
    fechaHasta:any;
}