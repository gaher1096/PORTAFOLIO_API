import { Request, Response, NextFunction } from "express";
import * as DeptoService from "../services/DeptoService";

// Crear un nuevo departamento
export const createDepto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { nombredepto, codigoarea, paisId } = req.body;

    try {
        const nuevoDepto = await DeptoService.createDepto(nombredepto, codigoarea, paisId);
        res.status(201).json(nuevoDepto);
    } catch (error: unknown) {
        next(new Error("Error al crear el departamento: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener todos los departamentos
export const getDeptos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deptos = await DeptoService.getDeptos();
        res.status(200).json(deptos);
    } catch (error: unknown) {
        next(new Error("Error al obtener los departamentos: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener un departamento por su ID
export const getDeptoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const departamento = await DeptoService.getDeptoById(id);
        res.status(200).json(departamento);
    } catch (error: unknown) {
        next(new Error("Error al obtener el departamento: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Actualizar un departamento
export const updateDepto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { nombredepto, codigoarea, paisId } = req.body;

    try {
        const departamentoActualizado = await DeptoService.updateDepto(id, nombredepto, codigoarea, paisId);
        res.status(200).json(departamentoActualizado);
    } catch (error: unknown) {
        next(new Error("Error al actualizar el departamento: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Eliminar un departamento
export const deleteDepto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const departamentoEliminado = await DeptoService.deleteDepto(id);
        res.status(200).json({ message: "Departamento eliminado correctamente" });
    } catch (error: unknown) {
        next(new Error("Error al eliminar el departamento: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};
