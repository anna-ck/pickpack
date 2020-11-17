import React from 'react';
import {useSelector} from 'react-redux'
import {getUser} from '../../../reducers';

import {Greeting, Icon, Message, LogoutButton, ToggleUserButton} from './UserPanelStyles';

const SavedPackingLists = React.lazy(() => import('./SavedPackingLists/SavedPackingLists'))

function UserPanel(props) {
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