
export class BlogEspacio{
    id_espacioFisico: number;
    blogs: Blogs
}
export class BlogHerramienta{
    id_herramienta:number;
    blogs: Blogs
}
export class BlogExperimento{
    id_experimento:number;
    blogs: Blogs
}
export class Blogs{
    id_usuario: number;
    detalle: string;
    tipo: string;
}
export class BlogBuscadoExperimento{
    id_experimento: number;
    fechaDesde: any;
    fechaHasta:any;
}
export class BlogBuscadoProyecto{
    id_proyecto: number;
    fechaDesde: any;
    fechaHasta:any;
}
export class BlogProyecto{
    id_proyecto:number;
    id:number;
    blogs: Blogs;
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
export class BlogBuscadoJaula{
    id_jaula:number;
    fechaDesde: any;
    fechaHasta:any;
}