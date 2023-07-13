import { IMongoDocument } from "../IMongoDocument";

export interface IBaseNote extends IMongoDocument {
    header: string,
    chapterId: string,
}
