import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width:100%;
    color: ${({ theme }) => theme.txt};
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    background: ${({ theme }) => theme.body};
    transition: all 0.5s linear;

    @media print {
      height:auto
    }
  }
`;
 
export default GlobalStyle;