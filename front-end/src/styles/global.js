import { createGlobalStyle } from "styled-components";
//Estilo global

const Global = createGlobalStyle`
    *
    {   
        margin: 0;
        padding: 0;
        front-family: 'poppins', sans-serif;
    }

    body
    {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        background-color: #e7e7e7;
    }
`;

export default Global;