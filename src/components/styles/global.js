import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  body{
    background-color: white;
    font-family: 'Inter', sans-serif;
    font-size: ${({theme})=> theme.computer.fontSize};
  }

  select:focus {
    outline: none;
  }
  
  a{
    display: block;
    margin: auto;
  }
  
  h1{ 
    margin: 2em 0 0 0;
  }
  
  @media (max-width: ${({theme})=> theme.tablet.width}){
      body{
        font-size: ${({theme})=> theme.tablet.fontSize};
      }
  }

  @media (max-width: ${({theme})=> theme.mobile.width}){
      body{
        font-size: ${({theme})=> theme.mobile.fontSize};
      }
  }
`
export default GlobalStyles;