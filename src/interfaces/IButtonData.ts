export default interface IButtonData {
    data: {
        color: string;
        textSize: number;
        width: number;
        height: number;
        radius: number;
        onClick: Function;
        id?: string;
    };
    children: React.ReactNode;
}