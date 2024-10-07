import PaisModel from "../models/PaisModel";
import { Types } from "mongoose";

export const createPais = async (nombrepais: string, codigopais: string, codigoiso: string) => {
    const nuevoPais = new PaisModel({ nombrepais, codigopais, codigoiso });
    return await nuevoPais.save();
};

export const getPaises = async () => {
    return await PaisModel.find();
};

export const getPaisById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    const pais = await PaisModel.findById(id);
    if (!pais) {
        throw new Error("País no encontrado");
    }
    return pais;
};

export const updatePais = async (id: string, nombrepais: string, codigopais: string, codigoiso: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    const paisActualizado = await PaisModel.findByIdAndUpdate(
        id,
        { nombrepais, codigopais, codigoiso },
        { new: true }
    );

    if (!paisActualizado) {
        throw new Error("País no encontrado");
    }
    return paisActualizado;
};

export const deletePais = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    const paisEliminado = await PaisModel.findByIdAndDelete(id);
    if (!paisEliminado) {
        throw new Error("País no encontrado");
    }
    return paisEliminado;
};