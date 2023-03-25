import { createGlobalStyle } from "styled-components"
import { Colors } from "./Colors";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
    }

    body{
        background-color: ${Colors.BACKGROUND};
    }

    #root{
        margin:0 auto;
    }
 `

export default GlobalStyle;