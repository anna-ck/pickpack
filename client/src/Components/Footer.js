import React from 'react';
import styled from 'styled-components'

const DivFooter = styled.footer`
width: 98%;
    color: ${({ theme }) => theme.txt};
    font-size: 0.8rem;
    text-align: left;
    padding: 0.5rem;
    @media print {
        display: none;
        visibility:hidden
     }
`;

function Footer() {
    return (
        <DivFooter>&#169; Copyright by ACK 2020</DivFooter>
    )
}

export default Footer