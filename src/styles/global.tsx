import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
        margin: 0px;
        padding: 0px;
        list-style: none;
        font-family: 'IBM Plex Sans', sans-serif;
        box-sizing: border-box;
    }

    button:hover{
      cursor: pointer;
      filter: brightness(1.2)
    }

    :root{
        --toastify-color-dark: #222222;
        --white: rgb(232, 230, 227);
        --dark-gray: #212529;
    }

    body{
      background-color: #f5f7fa;
      color: #656565;
      height: 100vh;

    }
`;
