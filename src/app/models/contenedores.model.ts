export interface Contenedor{
    id_contenedor?:number;
    codigo: number;
    nombre: string;
    descripcion: string;
    temperatura: number;
    proyecto: number;
    capacidad: number;
    fichaTecnica: string;
    disponible: boolean;
}