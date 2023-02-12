import styled from "styled-components";

export const CustomersSt = styled.form `

    background-color: rgb(256, 256, 256);
    border-radius: 0.5rem;
    padding: 20px;
    display: flex;
    flex-direction: column;

    label{
        font-size: 1.2rem;
        margin-bottom: 3px;
    }
    input, select{
        padding: 5px;
        font-size: 1.1rem;
        margin-bottom: 20px;
        background-color: #f2f2f2;
        border-radius: 0.5rem;
        border: 0;
    }

    .status span{
        font-size: 1.15rem;
        margin-left: 3px;
    }
    .status input[name=radio]:not(:first-child){
        margin-left: 20px;
    }

    textarea{
        height: 160px;
        padding: 5px;
        font-size: 1.05rem;
        resize: none;
    }

    button{
        max-width: 250px;
        margin-top: 15px;
    }
`