import { Schema, model, Document } from "mongoose";
import { IDepto } from "../interfaces/depto.interface";

const DeptoSchema = new Schema<IDepto>(
    {
        nombredepto: { type: String, required: true },
        codigoarea: { type: String, default: null },
        paisId: { type: Schema.Types.ObjectId, ref: "Pais", required: true },
    },
    {
        timestamps: true,
    }
);

const DeptoModel = model<IDepto>("Depto", DeptoSchema, "depto");

export default DeptoModel;
