export default interface IInputData {
    placeholder?: string;
    type?: string;
    value?: string | number;
    onValueChange: Function;
    id?: string;
}