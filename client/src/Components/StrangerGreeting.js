import React from 'react';
import styled from 'styled-components';
import { AppSalmon, AppBlue } from '../theme/Colors';

const Greeting = styled.div`
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Message= styled.h4`
    font-size: 1rem;
    padding-right: 0.7rem;
`;

const LoginButton = styled.button`
    background-color: white;
    padding: 0.3rem 0.9rem;
    border: 2px solid ${AppSalmon};
    border-radius: 5px;
    &:hover {
        border-color: ${AppBlue};
    }
`;

function StrangerGreeting({onAuthChange}) {
    return (
        <Greeting>
            <Message>Hello stranger!</Message>
            <LoginButton onClick={onAuthChange}>Log in</LoginButton>
        </Greeting>
    )
} 

export default StrangerGreeting;