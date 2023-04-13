import React from "react";
import styled from "styled-components";
import { Colors } from "../../Colors";
import { IBookCover } from "../../interfaces/IBookCover";

export default function BookCover(data: IBookCover, delegated: any) {
    const [isLoaded, setLoaded] = React.useState(false);

    function onLoad(): void {
        setLoaded(!isLoaded)
    }

    return (
        <Image onLoad={onLoad} onClick={data.onClick} {...delegated} src={data.cover} alt={data.title}></Image>
    );
}

const Image = styled.img`
    width: fit-content;
    position: relative;
    height: 350px;
    cursor: pointer;
    background-color: ${Colors.BACKGROUND};
`