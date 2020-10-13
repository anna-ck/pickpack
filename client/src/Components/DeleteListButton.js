//import { PromiseProvider } from 'mongoose';
import React, { useContext } from 'react';
import styled from 'styled-components';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import CurrentListContext from '../Contexts/CurrentListContext';

const StyledButton = styled.button`
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