export default interface IDropDownData {
  data: {
    selectedItem: string;
    items: string[];
    isOpen: boolean;
    onItemClick: Function;
  };
}
