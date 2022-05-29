import styled from "styled-components";

export const SendButton = styled.button`
    background-color: ${({theme})=> theme.sendButton.bc};
    color: ${({theme})=> theme.sendButton.color};
    width: 10em;
    margin: 2em auto;
    padding: 0.5em 2em;
    font-size: 1em;
    cursor: pointer;
`