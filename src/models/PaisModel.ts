import { Schema, model, Document } from "mongoose";

export interface IPais extends Document {
    nombrepais: string;
    codigopais?: string;
    codigoiso?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const PaisSchema = new Schema<IPais>(
    {
        nombrepais: { type: String, required: true },
        codigopais: { type: String, default: null },
        codigoiso: { type: String, default: null },
    },
    {
        timestamps: true,
    }
);

const PaisModel = model<IPais>("Pais", PaisSchema);

export default PaisModel;
