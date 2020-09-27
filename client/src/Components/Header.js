import React from 'react';
import styled from 'styled-components'

const DivHeader = styled.div`
    color: ${({ theme }) => theme.appHeader};
`
const LargeHeader = styled.h1`
    font-family: 'Rowdies', cursive;
    font-size: 3.5rem;
    letter-spacing: 0.1rem;
    text-align: center;
    padding-top: 3.7rem;
    font-weight: 400;

    @media (max-width: 690px) {
        font-size: 2.5rem
    }
`
const SmallHeader = styled.p`
    text-align: center;
    font-family: 'Rowdies', cursive;
    padding: 1.2rem;
    font-weight: 300;

    span {
        color: ${({ theme }) => theme.span};
    }

    @media (max-width: 690px) {
        font-size: 1rem
    }

    @media print {
        display: none;
        visibility:hidden
     }
`;

function Header() {
    return (
        <DivHeader>
            <LargeHeader>Pick &amp; Pack</LargeHeader>
            <SmallHeader>Pick items to add them to your <span>packing list</span>!</SmallHeader>
        </DivHeader>
    )
} 

export default Header;