import React from 'react';
import styled from 'styled-components';
import { AppSalmon } from '../../../theme/Colors';

const StyledButton = styled.button`
width: 9rem;
height: 2rem;
background-color: ${({ theme }) => theme.searchInput};
color: ${({ theme }) => theme.txt};
border: 2px solid ${AppSalmon};
margin: 0.3rem;
&:hover {
    background-color: ${({ theme }) => theme.span};
    color: white;
}
`;

function PrintListButton () {

        return (
            <StyledButton onClick={window.print}>Print current list</StyledButton>
        )
}

export default PrintListButton