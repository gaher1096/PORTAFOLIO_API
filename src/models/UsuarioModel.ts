import { Schema, model, Document } from "mongoose";

export interface IUsuario extends Document {
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

const UsuarioSchema = new Schema<IUsuario>(
    {
        nickusuario: { type: String, required: true, unique: true },
        claveusuario: { type: String, required: true },
        correousuario: { type: String, required: true, unique: true },
        nombresusuario: { type: String, required: true },
        apellidosusuario: { type: String },
        estadousuario: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
        imagenusuario: { type: String },
        telefonosusuario: { type: String },
        direccionusuario: { type: String },
    },
    {
        timestamps: true,
    }
);

const UsuarioModel = model<IUsuario>("Usuario", UsuarioSchema, "usuario");

export default UsuarioModel;