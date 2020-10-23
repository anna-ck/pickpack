import React, { useContext } from 'react';
import styled from 'styled-components';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import CurrentListContext from '../Contexts/CurrentListContext';
import { AppSalmon, AppBlue } from '../theme/Colors';

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

function DeleteListButton (props) {
    const {currentUser} = useContext(CurrentUserContext);
    const {currentList} = useContext(CurrentListContext);

    const Button = (props) => {
        return (
            <StyledButton onClick={props.onClick}>Delete current list</StyledButton>
        )
    }
    return (
        currentUser ? currentList.id ? <Button onClick={props.onClick} /> : null : null
    )
}

export default DeleteListButton