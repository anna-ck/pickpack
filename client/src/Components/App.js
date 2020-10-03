import React, { useState, useEffect, useRef }  from 'react';
import AuthenticationPage from '../Components/AuthenticationPage';
import AppContent from '../Components/AppContent';
import { itemLists } from '../Utilities/Helper'
import styled from 'styled-components';
import PickedItemsApi from '../api/fetchPickedItems';
import AuthenticationApi from '../api/fetchAuthentication';
import HandleSavedListsApi from '../api/fetchSavedLists'
import { v4 as uuidv4 } from 'uuid';


function App() {

    //const [accessToken, setAccessToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null)
    const [registerMessage, setRegisterMessage] = useState(null);
    const [isAuthorizationPanelHidden, setAuthorizationPanelHidden] = useState(true)

    useEffect(() => {setRegisterMessage();}, []);
    //useEffect(() => {setCurrentUser(currentUser);}, []);

    useEffect(() => {
      //const login = localStorage.getItem('login');
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.accessToken) {
        //setAccessToken(useraccessToken)
        setCurrentUser(user)
      }
    }, []);

    const handleLogging = (userInfo) => {
      AuthenticationApi.login(userInfo)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        //localStorage.setItem("accessToken", response.accessToken);
        const user = JSON.parse(localStorage.getItem('user'))
        //setAccessToken(localStorage.getItem('accessToken'))
        //setCurrentUser(response)
        setCurrentUser(user)
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
      const fetchData = async () => {
        const result = await PickedItemsApi.getAllPickedItems()
        if (result.length > 0) {
        PickedItemsApi.deleteAllPickedItems(result)}
      };
      fetchData();
      if (currentUser) {
      localStorage.removeItem("user");
      //localStorage.removeItem("accessToken");
      //setAccessToken(null)
      setCurrentUser(null)
      setAuthorizationPanelHidden(true)
      }
      else {
        setAuthorizationPanelHidden(false)
      }
    }

    const addCurrentPackingListToSavedLists = (pickedItems, currentListName) => {
      HandleSavedListsApi.addList(pickedItems, currentUser, currentListName)
      .then((response) => {
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response));
        const user = JSON.parse(localStorage.getItem('user'))
        setCurrentUser(user)
      })
      .catch((error) => {
        console.log(error.message)
      })
    }

    return (
      isAuthorizationPanelHidden ? <AppContent currentUser={currentUser} onAuthChange={handleAuthChange} onClick={addCurrentPackingListToSavedLists}/> : <AuthenticationPage onLogin={handleLogging} onRegister={handleRegistration} registerMessage={registerMessage}/>
    )
}

export default App
