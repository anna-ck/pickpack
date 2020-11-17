import React from 'react';

import {Greeting, Message, LoginButton} from './StrangerGreetingStyles';

function StrangerGreeting({onAuthChange}) {
    return (
        <Greeting>
            <Message>Hello stranger!</Message>
            <LoginButton onClick={onAuthChange}>Log in</LoginButton>
        </Greeting>
    )
} 

export default StrangerGreeting;