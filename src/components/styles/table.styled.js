import styled from "styled-components";

export const Table = styled.table`  
    
    width: 90%;
    margin: 3em auto;
    border-collapse: collapse;
      
    &, th, td{
        border: 1px solid #dddddd;
    }
    
    th,td{
        height: 3em;
        width: 5em;
        white-space: pre;
    }

    td{
        font-size: 0.8em;
    }
      
`
