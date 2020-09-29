import React, {useState} from 'react';
import RegistrationPanel from '../Components/RegistrationPanel';
import LoginPanel from '../Components/LoginPanel'

function AuthenticationPage (props) {
    const [isLoginPanelVisible, setLoginPanelVisible] = useState(true);

    const handlePanelChange = () => {
        setLoginPanelVisible(!isLoginPanelVisible)
    }

    return isLoginPanelVisible ? <LoginPanel onPanelChange={handlePanelChange} onLogin={props.onLogin}/> : <RegistrationPanel onPanelChange={handlePanelChange} onRegister={props.onRegister} registerMessage={props.registerMessage}/>
}
export default AuthenticationPage