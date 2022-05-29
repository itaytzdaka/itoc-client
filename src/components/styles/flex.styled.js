import styled from "styled-components";

export const Flex = styled.div`
    direction: rtl;
    display: flex;
    height: 100%;

    @media (max-width: ${({theme})=> theme.tablet.width}){
        flex-direction: column;
    }

`
