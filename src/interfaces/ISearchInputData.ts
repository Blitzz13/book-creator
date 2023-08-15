import { FormEvent } from "react";

export interface ISearchInputData {
  data: {
    onValueChange: Function;
    onSubmit: (event: FormEvent | null) => void;
  };
}
