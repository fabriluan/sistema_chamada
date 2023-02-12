import styled from "styled-components";

// 181c2e

export const Container_Sing = styled.section `
    width: 100%;
    height: auto;
    min-height: 100vh;
    background-color: #121212;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .center{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

export const Login = styled.div `
    background-color: #EAEAEC;
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo{
        width: 100%;
        padding: 5%;
        text-align: center;
        background-color: #181c2e;
    }
    .logo img{
        width: 20%;
    }

    form{
        width: 100%;
        padding: 3% 3% 0 3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    form h2{
        font-size: 2.2rem;
        text-transform: uppercase;
        color: #181c2e;
        /* margin-bottom: 10px; */
    }
    form input{
        font-size: 1.1rem;
        padding: 8px;
        width: 100%;
        margin: 10px 0;
        color: black;
        border: 0;
    }

    a{
        font-size: 1.1rem;
        font-weight: 300;
        margin: 15px 0;
        color: #181c2e;
    }

    a:hover{
        text-decoration: underline;
    }
`

export const ButtonLogin = styled.button `
        width: 100%;
        font-size: 1.3rem;
        padding: 8px;
        background-color: ${props => props.isOn ? '#181c2e' : '#717fbe'};
        cursor: ${props => props.isOn ? 'pointer' : 'not-allowed'};
        color: #EAEAEC;
        border: 0;
        border-radius: 0.5rem;
        margin-top: 5px;

        :hover{
            background-color: ${props => props.isOn ? '#283158' : '#717fbe'};   
        }
`