import { PromiseProvider } from 'mongoose';
import React, { useContext } from 'react';
import styled from 'styled-components';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import CurrentListContext from '../Contexts/CurrentListContext';

function SaveListButton (props) {
    const {currentUser} = useContext(CurrentUserContext);
    const {currentList} = useContext(CurrentListContext);

    const Button = (props) => {
        return (
            <button onClick={props.onClick}>{props.text}</button>
        )
    }
    return (
        currentUser ? currentList.id ? <Button onClick={props.onEdit} text={'save changes'} /> : <Button onClick={props.onClick} text={'save new list'}/> : null
    )
}

export default SaveListButton