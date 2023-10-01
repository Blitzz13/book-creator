import { ChangeEventHandler } from "react";

export interface IFileInputData {
    data:{
        onChange: ChangeEventHandler<HTMLInputElement>;
        accept?: string;
    }
}