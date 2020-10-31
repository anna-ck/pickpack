import React, {useContext} from 'react';
import styled from 'styled-components';
//import CurrentUserContext from '../Contexts/CurrentUserContext';
import {useDispatch, useSelector} from 'react-redux'
import { setUser } from '../actions';
import {getTheme, getPopupState, getUser} from '../reducers';
import { AppSalmon, AppBlue } from '../theme/Colors';

const SavedPackingLists = React.lazy(() => import('./SavedPackingLists'))

const Greeting = styled.div`
    padding: 4rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Icon= styled.div`
    font-size: 6rem;
    margin-top: 2rem;
`;

const Message= styled.h4`
    font-size: 1.2rem;
    padding: 1rem;
`;

const LogoutButton = styled.button`
    background-color: ${({ theme }) => theme.searchInput};
    margin-top: 3rem;
    padding: 0.3rem 0.9rem;
    border: 2px solid ${AppSalmon};
    border-radius: 5px;
    color: ${({ theme }) => theme.txt};
    
    &:hover {
        border-color: ${AppBlue};
    }
`;

const ToggleUserButton = styled.button`
    position: fixed;
    top: 1rem;
    left: 1rem;
    display: none;
    padding: 1rem 1.3rem;
    margin: 1rem 1rem 2.5rem 1rem;
    font-size: 1rem;
    border: none;
    background-color: inherit;
    color: ${({ theme }) => theme.txt};

    &:hover {
      color: ${({ theme }) => theme.span};
    }

    @media (max-width: 760px) {
      display: block;
    }
`;

function UserPanel(props) {
    //const {currentUser} = useContext(CurrentUserContext);
    const currentUser = useSelector(getUser)
    return (
        <Greeting>
            <ToggleUserButton onClick={props.onClick}><i className="fas fa-angle-double-left"></i>&nbsp; Go back to app</ToggleUserButton>
            <Icon><i className="fas fa-user-circle"></i></Icon>
            <Message>{currentUser.login}</Message>
            <React.Suspense fallback={'... loading saved lists'}><SavedPackingLists /></React.Suspense>
            <LogoutButton onClick={props.onAuthChange}><i className="fas fa-sign-out-alt" ></i>&nbsp; Logout</LogoutButton>
        </Greeting>
    )
} 

export default UserPanel;