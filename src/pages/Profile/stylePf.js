import styled from "styled-components";

export const ProfileSt = styled.section `

    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 20px;
    
    form{
        display: flex;
        flex-direction: column;
    }

    .label_avatar{
        position: relative;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        width: 23%;
        margin-top: 0 !important;
    }

    .label_avatar:hover{
        svg{
            opacity: 1;
            transform: scale(1.3);
            transition: 0.7s;
        }
    }

    .label_avatar input{
        display: none;
    }
    .label_avatar img{
        width: 100%;
        height: 250px;
        border-radius: 100em;
        object-fit: cover;
    }
    .label_avatar svg{
        position: absolute;
        top: 50%;
        width: 100%;
        opacity: 0;
    }

    form > label{
        font-size: 1.2rem;
        margin-top: 30px;
    }

    form > input{
        font-size: 1.1rem;
        padding: 5px;
    }

    form > input:disabled{
        cursor: not-allowed;
    }

    button{
        margin-top: 40px;
    }
`

export const ButtonPfSt = styled.section `
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 20px;

    button{
        width: 100%;
        max-width: 200px;
        font-size: 1.3rem;
        border-radius: 0.5rem;
        background-color: #181c2e;
        color: #ffffff;
        border: 0;
        padding: 10px 0;
    }
    button:hover{
        background-color: #283158;
    }
`