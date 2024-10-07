import { Request, Response, NextFunction } from "express";
import * as PaisService from "../services/PaisService";

// Crear un nuevo país
export const createPais = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { nombrepais, codigopais, codigoiso } = req.body;

    try {
        const nuevoPais = await PaisService.createPais(nombrepais, codigopais, codigoiso);
        res.status(201).json(nuevoPais);
    } catch (error: unknown) {
        next(new Error("Error al crear el país: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener todos los países
export const getPaises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const paises = await PaisService.getPaises();
        res.status(200).json(paises);
    } catch (error: unknown) {
        next(new Error("Error al obtener los países: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener un país por su ID
export const getPaisById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const pais = await PaisService.getPaisById(id);
        res.status(200).json(pais);
    } catch (error: unknown) {
        next(new Error("Error al obtener el país: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Actualizar un país
export const updatePais = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { nombrepais, codigopais, codigoiso } = req.body;

    try {
        const paisActualizado = await PaisService.updatePais(id, nombrepais, codigopais, codigoiso);
        res.status(200).json(paisActualizado);
    } catch (error: unknown) {
        next(new Error("Error al actualizar el país: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Eliminar un país
export const deletePais = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const paisEliminado = await PaisService.deletePais(id);
        res.status(200).json({ message: "País eliminado correctamente" });
    } catch (error: unknown) {
        next(new Error("Error al eliminar el país: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};