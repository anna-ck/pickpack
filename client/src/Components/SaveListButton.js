import { PromiseProvider } from 'mongoose';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function SaveListButton (props) {

    const Button = (props) => {
        return (
            <button onClick={props.onClick}>Save</button>
        )
    }
    return (
        props.currentUser ? <Button /> : null
    )
}

export default SaveListButton