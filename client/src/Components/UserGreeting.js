import React, {useContext} from 'react';
import styled from 'styled-components';
import CurrentUserContext from '../Contexts/CurrentUserContext'

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
    const {currentUser} = useContext(CurrentUserContext);
    return (
        <Greeting>
            <Message>Hello {currentUser? currentUser.login : 'stranger'}!</Message>
            <LogoutButton onClick={props.onAuthChange}>{currentUser ? 'log out' : 'log in'}</LogoutButton>
        </Greeting>
    )
} 

export default UserGreeting;