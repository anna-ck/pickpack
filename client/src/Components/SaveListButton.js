import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux'
import {getUser, getCurrentList} from '../reducers';
import { AppSalmon} from '../theme/Colors';

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

function SaveListButton (props) {
    const currentUser = useSelector(getUser)
    const currentList = useSelector(getCurrentList)
    
    const Button = (props) => {
        return (
            <StyledButton onClick={props.onClick}>{props.text}</StyledButton>
        )
    }
    return (
        currentUser ? currentList.id ? <Button onClick={props.onEdit} text={'Save changes'} /> : <Button onClick={props.onSave} text={'Save new list'}/> : null
    )
}

export default SaveListButton