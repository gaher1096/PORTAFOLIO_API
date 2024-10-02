import { Request, Response, NextFunction } from "express";
import PaisModel from "../models/PaisModel";
import { Types } from "mongoose";

// Crear un nuevo país
export const createPais = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { nombrepais, codigopais, codigoiso } = req.body;

    const nuevoPais = new PaisModel({ nombrepais, codigopais, codigoiso });

    try {
        await nuevoPais.save();
        res.status(201).json(nuevoPais); // Aquí se incluirán los campos createdAt y updatedAt
    } catch (error: unknown) {
        next(new Error("Error al crear el país: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener todos los países
export const getPaises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const paises = await PaisModel.find();
        res.status(200).json(paises); // Aquí también se incluirán los campos createdAt y updatedAt
    } catch (error: unknown) {
        next(new Error("Error al obtener los países: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Obtener un país por su ID
export const getPaisById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    try {
        const pais = await PaisModel.findById(id);

        if (!pais) {
            res.status(404).json({ message: "País no encontrado" });
            return;
        }

        res.status(200).json(pais); // Los timestamps también estarán presentes aquí
    } catch (error: unknown) {
        next(new Error("Error al obtener el país: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Actualizar un país
export const updatePais = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { nombrepais, codigopais, codigoiso } = req.body;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    try {
        const paisActualizado = await PaisModel.findByIdAndUpdate(
            id,
            { nombrepais, codigopais, codigoiso },
            { new: true }
        );

        if (!paisActualizado) {
            res.status(404).json({ message: "País no encontrado" });
            return;
        }

        res.status(200).json(paisActualizado); // updatedAt se actualizará automáticamente
    } catch (error: unknown) {
        next(new Error("Error al actualizar el país: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};

// Eliminar un país
export const deletePais = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "ID no válido" });
        return;
    }

    try {
        const paisEliminado = await PaisModel.findByIdAndDelete(id);

        if (!paisEliminado) {
            res.status(404).json({ message: "País no encontrado" });
            return;
        }

        res.status(200).json({ message: "País eliminado correctamente" });
    } catch (error: unknown) {
        next(new Error("Error al eliminar el país: " + (error instanceof Error ? error.message : "Error desconocido")));
    }
};
