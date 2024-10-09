import UsuarioModel from "../models/UsuarioModel";
import { Types } from "mongoose";
import argon2 from "argon2";

// Crear un nuevo usuario con confirmación de clave
export const createUsuario = async (
    nickusuario: string,
    claveusuario: string,
    claveusuarioconfirmacion: string,
    correousuario: string,
    nombresusuario: string,
    apellidosusuario?: string,
    estadousuario?: 'Activo' | 'Inactivo',
    imagenusuario?: string,
    telefonosusuario?: string,
    direccionusuario?: string
) => {
    // Verificar si la clave y la confirmación coinciden
    if (claveusuario !== claveusuarioconfirmacion) {
        throw new Error("Las claves no coinciden");
    }

    // Encriptar la clave antes de guardar
    const claveEncriptada = await argon2.hash(claveusuario); // Usar Argon2

    const nuevoUsuario = new UsuarioModel({
        nickusuario,
        claveusuario: claveEncriptada, // Guardar la clave encriptada
        correousuario,
        nombresusuario,
        apellidosusuario,
        estadousuario,
        imagenusuario,
        telefonosusuario,
        direccionusuario,
    });

    return await nuevoUsuario.save();
};

// Obtener todos los usuarios
export const getUsuarios = async () => {
    return await UsuarioModel.find();
};

// Obtener un usuario por su ID
export const getUsuarioById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    const usuario = await UsuarioModel.findById(id);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }
    return usuario;
};

// Actualizar un usuario
export const updateUsuario = async (
    id: string,
    nickusuario: string,
    correousuario: string,
    nombresusuario: string,
    claveusuario?: string,
    claveusuarioconfirmacion?: string,
    apellidosusuario?: string,
    estadousuario?: 'Activo' | 'Inactivo',
    imagenusuario?: string,
    telefonosusuario?: string,
    direccionusuario?: string
) => {
    // Verificar si el ID es válido
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    // Preparar los datos de actualización
    const updateData: any = {
        nickusuario,
        correousuario,
        nombresusuario,
        apellidosusuario,
        estadousuario,
        imagenusuario,
        telefonosusuario,
        direccionusuario,
    };

    // Validar la clave y su confirmación
    if (claveusuario) {
        if (claveusuario !== claveusuarioconfirmacion) {
            throw new Error("Las contraseñas no coinciden");
        }
        // Encriptar la clave si se proporciona y pasa la validación
        updateData.claveusuario = await argon2.hash(claveusuario);
    }

    // Actualizar el usuario en la base de datos
    const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );

    if (!usuarioActualizado) {
        throw new Error("Usuario no encontrado");
    }

    return usuarioActualizado;
};

// Eliminar un usuario
export const deleteUsuario = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id);
    if (!usuarioEliminado) {
        throw new Error("Usuario no encontrado");
    }
    return usuarioEliminado;
};
