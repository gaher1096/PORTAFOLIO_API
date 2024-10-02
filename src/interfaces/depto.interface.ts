import { ObjectId } from "mongoose";

export interface IDepartamento {
    _id?: ObjectId;
    nombredepto: string;
    codigoarea?: string;
    paisId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
