import styled from "styled-components";

export const Nav = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
    box-shadow: -2px 0px 30px rgb(230, 230, 230);
    text-align: center;
    overflow: auto;

    .user{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #19388A;
        color: white;
    }
    
    .user p{
        margin-top: 1em;
    }
    
    ul{
        list-style-type: none;
    }
    
    ul li{
        margin: 3em 0;
    }
    
    ul li a{
        display: inline;
        text-decoration: none;
        color: black;
    }

    @media (max-width: ${({theme})=> theme.tablet.width}){
        flex-direction: row;
        width: 100%;
        align-items: center;
        overflow: visible;

        .user{
            height: 100%;
        }

        nav{
            flex-grow: 1;
            justify-content: space-around;
        }

        ul{
            display: flex;
            justify-content: space-around;
        }

        ul li{
            display: inline;
            margin: 0;
        }
    }

`
