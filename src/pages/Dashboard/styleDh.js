import styled from "styled-components";

export const NewCh = styled.section `
    background-color: ${props => props.isLength ? '#ffffff' : 'rgba(0, 0, 0, 0)'};
    border-radius: 0.5rem;
    padding: ${props => props.isLength ? '20px' : '0px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${props => props.isLength ? 'center' : 'flex-end'};

    span{
        font-size: 1.4rem;
        font-weight: 600;
    }

    a{
        width: 100%;
        max-width: 220px;
        margin-top: ${props => props.isLength ? '23px' : '0px'};
        border-radius: 0.5rem;
        text-align: center;
        background-color: #15bd3f;
        color: #ffffff;
        font-size: 1.3rem;
        padding: 7px;
    }

    a:hover{
        transition: 0.7s;
        transform: scale(1.05);
    }
`

export const TableChSt = styled.table `
    width: 100%;
    text-align: center;
    margin-top: 10px;
    border: 0;
    border-collapse: collapse;

    thead{
        background-color: #ffffff;
        font-size: 1.2rem;
        text-transform: uppercase;
        border: 1px solid #efefef;

        th{
            padding: 10px;
            font-weight: 600;
        }
    }

    tbody{
        background-color: #ffffff;
        font-size: 1.1rem;
        
        td{
            padding: 10px;

            span{
                color: #ffffff;
                padding: 4px 7px;
                border-radius: 0.5rem;
            }

            .click_btn{
                border: 0;
                padding: 5px;
                display: flex;
                margin: 0 5px;
                border-radius: 0.5rem;
            }

            .click_btn:nth-child(1){
                background-color: #00a2dd;
            }
            .click_btn:nth-child(2){
                background-color: #fff94f;
            }
        }

        td:nth-last-child(1){
            display: flex;
            justify-content: center;
        }
    }


`