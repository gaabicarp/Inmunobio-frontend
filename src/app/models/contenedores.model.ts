export interface Contenedor{
    id_contenedor?:number;
    codigo: number;
    nombre: string;
    descripcion: string;
    temperatura: number;
    id_proyecto: number;
    id_espacioFisico: number;
    capacidad: number;
    fichaTecnica: string;
    disponible: boolean;
}