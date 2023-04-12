import styled from "styled-components";

export default function BookCover(data:{ bookId: string, onClick: Function }, delegated: any) {
    return (
        <Image onClick={data.onClick} {...delegated} src="https://pictures.abebooks.com/isbn/9780345427656-us.jpg"></Image>
    );
}

const Image = styled.img`
    width: fit-content;
    position: relative;
    height: 350px;
    cursor: pointer;
`