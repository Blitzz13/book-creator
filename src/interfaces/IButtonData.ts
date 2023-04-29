export default interface IButtonData {
    data: {
        color: string;
        textSize: number;
        width: number;
        height: number;
        radius: number;
        onClick: Function;
        id?: string;
        type?: string;
    };
    children: React.ReactNode;
}