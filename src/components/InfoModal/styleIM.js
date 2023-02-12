import styled from "styled-components";

export const InfoModalSt = styled.section `
    z-index: 99;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);

    div.info{
        background-color: #ffffff;
        padding: 20px;
        width: 60%;
        display: flex;
        flex-direction: column;
        /* white-space: pre-wrap; */

        button{
            width: 100%;
            max-width: 150px;
            font-size: 1.2rem;
            padding: 5px;
            border-radius: 0 1.5rem 1.5rem 0;
            color: #ffffff;
            background-color: #ff5b42;
            border: 0;
            margin-bottom: 15px;

            :hover{
                transform: scale(1.05);
                transition: 0.5s;
            }
        }

        h2{
            font-size: 1.8rem;
            margin-bottom: 10px;
        }

        span{
            font-size: 1.2rem;
            margin: 7px 0;

            p{
                font-size: 1.1rem;
            }
        }

        .info_group{
            span:nth-last-child(1){
                margin-left: 50px;
            }
        }

    }
`