import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: ${({width})=>width || "30%"};
    
    div{
        display: flex;
        align-items: center;
        margin: 0.5em 0;
    }

    div *{
        flex: 1;
    }

    div span:first-child, label{
        text-align: start;
    }

    select{
        text-align: center;
    }

    @media (max-width: ${({theme})=> theme.tablet.width}){
        width: 60%;
    }

    @media (max-width: ${({theme})=> theme.mobile.width}){
        width: 80%;
    }
    
`
