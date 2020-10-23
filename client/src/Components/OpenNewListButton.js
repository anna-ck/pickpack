import React from 'react';
import styled from 'styled-components';
import {AppSalmon} from '../theme/Colors';

const Button = styled.button`
    width: 9rem;
    height: 2rem;
    float: right;
    margin: 0rem 0rem 0.5rem 1rem;
    background-color: ${({ theme }) => theme.searchInput};
    color: ${({ theme }) => theme.txt};
    border: 2px solid ${AppSalmon};

    &:hover {
        background-color: ${({ theme }) => theme.span};
        color: white;
    }

    @media print {
        display: none;
        visibility:hidden
    }
`;

function OpenListButton (props) {
    return (
        <Button onClick={props.onClick}>&#43; Create new list</Button>
    )
}

export default OpenListButton