import { Request, Response, NextFunction } from "express";
import * as UsuarioService from "../services/UsuarioService";

// Crear un nuevo usuario
export const createUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        nickusuario,
        claveusuario,
        claveusuarioconfirmacion,
        correousuario,
        nombresusuario,
        apellidosusuario,
        estadousuario,
        telefonosusuario,
        direccionusuario
    } = req.body;

    // Manejo del archivo de imagen
    const imagenusuario = req.file ? req.file.filename : undefined;

    try {
        const nuevoUsuario = await UsuarioService.createUsuario(
            nickusuario,
            claveusuario,
            claveusuarioconfirmacion,
            correousuario,
            nombresusuario,
            apellidosusuario,
            estadousuario,
            imagenusuario,
            telefonosusuario,
            direccionusuario
        );
        res.status(201).json(nuevoUsuario);
    } catch (error: unknown) {
        next(new Error("Error al crear el Usuario: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const usuarios = await UsuarioService.getUsuarios();
        res.status(200).json(usuarios);
    } catch (error: unknown) {
        next(new Error("Error al obtener los usuarios: " + (error instanceof Error ? error.message : "Error desconocido")))
    }
}

// Obtener un usuario por su ID
export const getUsuariosById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
        const usuario = await UsuarioService.getUsuarioById(id);
        res.status(200).json(usuario);
    } catch (error: unknown) {
        next(new Error("Error al obtener el usuario: " + (error instanceof Error ? error.message : "Error desconocido")))
    }
}

// Actualizar un usuario
export const updateUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const {
        nickusuario,
        claveusuario,
        claveusuarioconfirmacion,
        correousuario,
        nombresusuario,
        apellidosusuario,
        estadousuario,
        telefonosusuario,
        direccionusuario
    } = req.body;
    const imagenusuario = req.file ? req.file.filename : undefined;

    try {
        const usuarioActualizado = await UsuarioService.updateUsuario(
            id,
            nickusuario,
            correousuario,
            nombresusuario,
            claveusuario,
            claveusuarioconfirmacion,
            apellidosusuario,
            estadousuario,
            imagenusuario,
            telefonosusuario,
            direccionusuario
        );
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        next(new Error("Error al actualizar el usurio: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
}

// Eliminar un usuario
export const deleteUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const usuarioEliminado = await UsuarioService.deleteUsuario(id);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error: unknown) {
        next(new Error("Error al eliminar el usuario: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};
