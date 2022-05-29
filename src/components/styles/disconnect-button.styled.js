import styled from "styled-components";

export const DisconnectButton = styled.button`
    margin: 1em;
    padding: 0.3em;
    width: 5em;
    background-color: ${({theme})=> theme.DisconnectButton.bc};
    color: ${({theme})=> theme.DisconnectButton.color};
    font-size: 1em;
    cursor: pointer;
`

