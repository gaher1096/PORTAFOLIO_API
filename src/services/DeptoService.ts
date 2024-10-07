import DeptoModel from "../models/DeptoModel";
import { Types } from "mongoose";

export const createDepto = async (nombredepto: string, codigoarea: string, paisId: Types.ObjectId) => {
    const nuevoDepto = new DeptoModel({ nombredepto, codigoarea, paisId });
    return await nuevoDepto.save();
};

export const getDeptos = async () => {
    return await DeptoModel.find().populate('paisId');
};

export const getDeptoById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    const departamento = await DeptoModel.findById(id).populate('paisId');
    if (!departamento) {
        throw new Error("Depto no encontrado");
    }
    return departamento;
};

export const updateDepto = async (id: string, nombredepto: string, codigoarea: string, paisId: Types.ObjectId) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    const departamentoActualizado = await DeptoModel.findByIdAndUpdate(
        id,
        { nombredepto, codigoarea, paisId },
        { new: true }
    ).populate('paisId');

    if (!departamentoActualizado) {
        throw new Error("Departamento no encontrado");
    }
    return departamentoActualizado;
};

export const deleteDepto = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("ID no válido");
    }

    const departamentoEliminado = await DeptoModel.findByIdAndDelete(id);

    if (!departamentoEliminado) {
        throw new Error("Departamento no encontrado");
    }
    return departamentoEliminado;
};