export default interface IModalData {
    setOpen: (toggle: boolean) => void;
    isOpen: boolean;
    width: string;
    children: React.ReactNode 
    height?: number;
}