import React from 'react';
import styled from 'styled-components'

const DivFooter = styled.footer`
    color: ${({ theme }) => theme.txt};
    font-size: 0.8rem;
    padding: 0rem 0rem 1rem 0.5rem;

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