import styled from 'styled-components';
import { AppSalmon } from '../../../../theme/Colors';

export const Button = styled.button`
width: 100%;
padding: 0.5rem 1rem;
background-color: ${({ theme }) => theme.searchInput};
border: 2px solid grey;
border-radius: 5px;
color: ${({ theme }) => theme.txt};
&:hover {
    background-color: ${({ theme }) => theme.userHover};
    border: 2px solid ${AppSalmon};
}
`;

export const SavedList = styled.div`
padding: 0.2rem;
margin: 0 auto;
width: 90%
`;

export const SavedListsWrapper = styled.div`
width: 11rem;
text-align: left;
padding-top: 1rem;
z-index: 90;
overflow: auto;
`;

export const Text = styled.h1`
text-align: center;
padding: 0.5rem;
font-size: 1rem;
`;