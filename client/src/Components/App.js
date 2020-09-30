import React, { useState, useEffect, useRef }  from 'react';
import AuthenticationPage from '../Components/AuthenticationPage';
import AppContent from '../Components/AppContent';
import { itemLists } from '../Utilities/Helper'
import styled from 'styled-components';
import PickedItemsApi from '../api/fetchPickedItems';
import AuthenticationApi from '../api/fetchAuthentication';
import { v4 as uuidv4 } from 'uuid';


function App() {

    const [accessToken, setAccessToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null)
    const [registerMessage, setRegisterMessage] = useState(null);
    const [isAuthorizationPanelHidden, setAuthorizationPanelHidden] = useState(true)

    useEffect(() => {setRegisterMessage();}, []);

    useEffect(() => {
      const login = localStorage.getItem('login');
      const accessToken = localStorage.getItem('accessToken');
      if (login && accessToken) {
        setAccessToken(accessToken)
        setCurrentUser(login)
      }
    }, [localStorage]);

    const handleLogging = (userInfo) => {
      AuthenticationApi.login(userInfo)
      .then((response) => {
        localStorage.setItem("login", response.login);
        localStorage.setItem("accessToken", response.accessToken);
        setAccessToken(localStorage.getItem('accessToken'))
        setCurrentUser(localStorage.getItem('login'))
        setAuthorizationPanelHidden(true)
      })
      .catch((error) => console.log(error))
    }

    const handleRegistration = (userInfo) => {
      AuthenticationApi.register(userInfo)
      .then((response) => setRegisterMessage(response.message))
      .catch((error) => {
        setRegisterMessage(error.message)
      })
    }

    const handleAuthChange = () => {
      if (accessToken) {
      localStorage.removeItem("login");
      localStorage.removeItem("accessToken");
      setAccessToken(null)
      setCurrentUser(null)
      setAuthorizationPanelHidden(true)
      }
      else {
        setAuthorizationPanelHidden(false)
      }
    }

    return (
      isAuthorizationPanelHidden ? <AppContent currentUser={currentUser} onAuthChange={handleAuthChange}/> : <AuthenticationPage onLogin={handleLogging} onRegister={handleRegistration} registerMessage={registerMessage}/>
    )
}

export default App
