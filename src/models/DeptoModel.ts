import { Schema, model, Document } from "mongoose";
import { IDepartamento } from "../interfaces/depto.interface";

const DepartamentoSchema = new Schema<IDepartamento>(
    {
        nombredepto: { type: String, required: true },
        codigoarea: { type: String, default: null },
        paisId: { type: Schema.Types.ObjectId, ref: "Pais", required: true },
    },
    {
        timestamps: true,
    }
);

const DepartamentoModel = model<IDepartamento>("Departamento", DepartamentoSchema);

export default DepartamentoModel;
