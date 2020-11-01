import React from 'react';
import styled from 'styled-components';
import { AppSalmon } from '../theme/Colors';
import { useSelector} from 'react-redux'
import {getUser, getCurrentList} from '../reducers';

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
    const currentUser = useSelector(getUser)
    const currentList = useSelector(getCurrentList)

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