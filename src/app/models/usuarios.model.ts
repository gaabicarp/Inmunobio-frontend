export class Usuario {
    direccion: string;
    email: string;
    esJefeDe?: any;
    habilitado: boolean;
    id_grupoDeTrabajo?: any;
    id_usuario: number;
    nombre: string;
    password: string;
    permisos: Permiso[];
    telefono: string;
  }

interface Permiso {
    descripcion: string;
    id_permiso: number;
}

export class postUsuario {
    id?: number;
    nombre: string;
    password: string;
    direccion: string;
    email: string;
    telefono: string;
    permisos: Permiso[];
}
