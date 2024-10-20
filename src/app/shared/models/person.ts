export interface Person{
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    edad: number,
    telefono: number,
    remove?: boolean,
}

export interface PersonBody {
    nombre: string,
    apellido: string,
    correo: string,
    edad: number,
    telefono: number,
 }