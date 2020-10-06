import { PromiseProvider } from 'mongoose';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function SaveListButton (props) {

    const Button = (props) => {
        return (
            <>
            <button onClick={props.onClick}>{props.text}</button>
            </>
        )
    }
    return (
        props.currentUser ? props.currentList.id ? <Button onClick={props.onEdit} text={'save changes'} /> : <Button onClick={props.onClick} text={'save new list'}/> : null
    )
}

export default SaveListButton