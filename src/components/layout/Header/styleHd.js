import styled from "styled-components";
import banner from "../../../assets/cover.png"

export const AsideHeader = styled.aside `
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #181c2e;
    width: 230px;
    height: auto;
    min-height: 100vh;

    div{
        width: 100%;
        text-align: center;
        background-image: url(${banner});
        background-size: cover;
        background-position: 100% 100%;
        padding: 10px;
    }

    div > img{
        width: 60%;
        height: 128px;
        border-radius: 100%;
        object-fit: cover;
        filter: drop-shadow(0px 0px 40px black);
    }

    nav{
        width: 100%;
    }

    nav > ul{
        margin-top: 10px;
    }

    nav > ul > li{
        width: 100%;
    }

    nav > ul > li > a{
        display: inline-block;
        width: 100%;
        padding: 15px;
        border-top: 2px solid #373f64;
        color: #fff;
        font-size: 1.2rem;
    }

    nav > ul > li > a:hover{
        background-color: #373f64;
        transition: 0.5s;
    }

    nav > ul > li:last-child {
        border-bottom: 2px solid #373f64;
    }

    nav > ul > li > a > svg{
        margin-right: 10px;
    }

    @media screen and (max-width: 860px) {
        position: static;
        flex-direction: row;
        background-color: #181c2e;
        min-height: auto;

        > div{
            display: none;
        }

        nav > ul{
            display: flex;
            flex-direction: row;
        }

        nav > ul > li{
            width: auto;
            padding: 10px;
        }   

        nav > ul > li > a{
            width: auto;
            padding: 10px;
            border-top: 0;
        }

        nav > ul > li > a:hover{
            background-color: #181c2e;
            text-decoration: underline;
            transition: 0.5s;
        }
    }
`