//import { PromiseProvider } from 'mongoose';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
`;

function OpenListButton (props) {
    return (
        <Button onClick={props.onClick}>Create new list</Button>
    )
}

export default OpenListButton