import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle `

    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    *:focus{
        outline: 0;
    }

    body,html, #root{
        height: 100vh;
    }

    body{
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        background-color: #EfEfEF;
    }

    a{
        text-decoration: none;
    }

    ul{
        list-style-type: none;
    }

    li{
        list-style-type: none;
    }

    button{
        cursor: pointer;
    }

    .center{
        width: 100%;
        max-width: 90vw;
        margin: 0 auto;
    }

    .content{
        margin-left: 230px;
        padding: 20px;
    }

`

export default GlobalStyled;