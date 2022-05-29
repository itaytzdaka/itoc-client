import styled from "styled-components";

export const Input = styled.input`
height: 3em;
width: 100%;
color: ${({theme})=> theme.input.color};
background-color: ${({theme})=> theme.input.bc};
border: none;
margin: 1em auto;
text-align: center;

&:focus{
    outline: none;
  }
`
