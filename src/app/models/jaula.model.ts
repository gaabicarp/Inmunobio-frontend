export interface Jaula{
    codigo: string;
    rack : number;
    estante : number;
    capacidad:number;
    id_jaula?: number;
    id_proyecto?: number;
    nombre_proyecto?: string;
    habilitado?:boolean;
    id_espacio_fisico?:number;
    tipo: string;
}
