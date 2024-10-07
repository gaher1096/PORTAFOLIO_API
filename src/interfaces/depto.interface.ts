import { ObjectId } from "mongoose";

export interface IDepto {
    _id?: ObjectId;
    nombredepto: string;
    codigoarea?: string;
    paisId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
