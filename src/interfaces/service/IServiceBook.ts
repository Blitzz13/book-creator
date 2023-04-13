import { IMongoDocument } from "./IMongoDocument";

export interface IServiceBook extends IMongoDocument {
    coverImage: string;
    title: string;
}