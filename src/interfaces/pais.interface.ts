import { ObjectId } from "mongoose";

export interface IPais {
    _id?: ObjectId;
    nombrepais: string;
    codigopais?: string;
    codigoiso?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
