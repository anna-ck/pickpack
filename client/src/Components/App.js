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
    const [accessToken, setAccessToken] = useState(null)
    const [registerMessage, setRegisterMessage] = useState(null);
    const [isAuthorizationPanelHidden, setAuthorizationPanelHidden] = useState(true)

    useEffect(() => {setRegisterMessage();}, []);
    //useEffect(() => {setCurrentUser(currentUser);}, []);

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && accessToken) {
        //setAccessToken(useraccessToken)
        setCurrentUser(user)
        setAccessToken(accessToken)
      }
    }, []);

    const handleLogging = (userInfo) => {
      AuthenticationApi.login(userInfo)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("accessToken", response.accessToken);
        //localStorage.setItem("accessToken", response.accessToken);
        const user = JSON.parse(localStorage.getItem('user'))
        const accessToken = localStorage.getItem('accessToken')
        //setAccessToken(localStorage.getItem('accessToken'))
        //setCurrentUser(response)
        setCurrentUser(user)
        setAccessToken(accessToken)
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
      localStorage.removeItem("pickedItems");
      localStorage.removeItem("currentList");
      if (currentUser) {
      localStorage.removeItem("user");
      localStorage.removeItem('accessToken')
      setCurrentUser(null)
      setAccessToken(null)
      setAuthorizationPanelHidden(true)
      }
      else {
        setAuthorizationPanelHidden(false)
      }
    }

    const addCurrentPackingListToSavedLists = (pickedItems, currentList) => {
      HandleSavedListsApi.addList(pickedItems, currentUser, currentList)
      .then((response) => {
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response));
        const user = JSON.parse(localStorage.getItem('user'))
        setCurrentUser(user)
        localStorage.removeItem("pickedItems");
        localStorage.removeItem("currentList");
      })
      .catch((error) => {
        console.log(error.message)
      })
    }

    const editCurrentSavedList = (pickedItems, currentList) => {
      console.log(currentList)
      console.log(currentUser)
      HandleSavedListsApi.updateList(pickedItems, currentUser, currentList)
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
      isAuthorizationPanelHidden ? <AppContent currentUser={currentUser} onAuthChange={handleAuthChange} onClick={addCurrentPackingListToSavedLists} onEdit={editCurrentSavedList}/> : <AuthenticationPage onLogin={handleLogging} onRegister={handleRegistration} registerMessage={registerMessage}/>
    )
}

export default App
