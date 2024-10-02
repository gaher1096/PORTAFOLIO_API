import { Request, Response, NextFunction } from "express";
import DepartamentoModel from "../models/DeptoModel";
import { Types } from "mongoose";

// Crear un nuevo departamento
export const createDepartamento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { nombredepto, codigoarea, paisId } = req.body;

    const nuevoDepartamento = new DepartamentoModel({ nombredepto, codigoarea, paisId });

    try {
        await nuevoDepartamento.save();
        res.status(201).json(nuevoDepartamento);
    } catch (error: unknown) {
        next(new Error("Error al crear el departamento: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener todos los departamentos
export const getDepartamentos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const departamentos = await DepartamentoModel.find().populate('paisId');
        res.status(200).json(departamentos);
    } catch (error: unknown) {
        next(new Error("Error al obtener los departamentos: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener un departamento por su ID
export const getDepartamentoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    try {
        const departamento = await DepartamentoModel.findById(id).populate('paisId');

        if (!departamento) {
            res.status(404).json({ message: "Departamento no encontrado" });
            return;
        }

        res.status(200).json(departamento);
    } catch (error: unknown) {
        next(new Error("Error al obtener el departamento: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Actualizar un departamento
export const updateDepartamento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { nombredepto, codigoarea, paisId } = req.body;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    try {
        const departamentoActualizado = await DepartamentoModel.findByIdAndUpdate(
            id,
            { nombredepto, codigoarea, paisId },
            { new: true }
        ).populate('paisId');

        if (!departamentoActualizado) {
            res.status(404).json({ message: "Departamento no encontrado" });
            return;
        }

        res.status(200).json(departamentoActualizado);
    } catch (error: unknown) {
        next(new Error("Error al actualizar el departamento: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Eliminar un departamento
export const deleteDepartamento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    try {
        const departamentoEliminado = await DepartamentoModel.findByIdAndDelete(id);

        if (!departamentoEliminado) {
            res.status(404).json({ message: "Departamento no encontrado" });
            return;
        }

        res.status(200).json({ message: "Departamento eliminado correctamente" });
    } catch (error: unknown) {
        next(new Error("Error al eliminar el departamento: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};
