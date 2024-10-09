import { ObjectId } from "mongoose";

export interface IUsuario {
    _id?: ObjectId;
    nickusuario: string;
    claveusuario: string;
    correousuario: string;
    nombresusuario: string;
    apellidosusuario?: string;
    estadousuario: 'Activo' | 'Inactivo';
    imagenusuario?: string;
    telefonosusuario?: string;
    direccionusuario?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
