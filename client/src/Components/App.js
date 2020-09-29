import React, { useState, useEffect, useRef }  from 'react';
import AuthenticationPage from '../Components/AuthenticationPage';
import AppContent from '../Components/AppContent';
import { itemLists } from '../Utilities/Helper'
import styled from 'styled-components';
import PickedItemsApi from '../api/fetchPickedItems';
import AuthenticationApi from '../api/fetchAuthentication';
import { v4 as uuidv4 } from 'uuid';


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [registerMessage, setRegisterMessage] = useState(null);

    useEffect(() => {setRegisterMessage();}, []);


    const handleLogging = (userInfo) => {
      AuthenticationApi.login(userInfo)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    }

    const handleRegistration = (userInfo) => {
      AuthenticationApi.register(userInfo)
      .then((response) => setRegisterMessage(response.message))
      .catch((error) => {
        setRegisterMessage(error.message)
      })
    }

    return (
      isLoggedIn ? <AppContent /> : <AuthenticationPage onLogin={handleLogging} onRegister={handleRegistration} registerMessage={registerMessage}/>
    )
}

export default App
