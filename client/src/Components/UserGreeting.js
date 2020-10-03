import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const Greeting = styled.div`
    max-width: 100%;
    float: left;
    padding: 20px;
`;

const Message= styled.h4`
    font-size: 1rem;
`;

const LogoutButton = styled.button`
`;

function UserGreeting(props) {
    const [user, setUser] = useState('');
    useEffect(() => {setUser(props.currentUser);}, [props]);
    return (
        <Greeting>
            <Message>Hello {user? user.login : 'stranger'}!</Message>
            <LogoutButton onClick={props.onAuthChange}>{user ? 'log out' : 'log in'}</LogoutButton>
        </Greeting>
    )
} 

export default UserGreeting;