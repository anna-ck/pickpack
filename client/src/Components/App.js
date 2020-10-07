import React, { useState, useEffect }  from 'react';

import AuthenticationPage from '../Components/AuthenticationPage';
import AppContent from '../Components/AppContent';

import AuthenticationApi from '../api/fetchAuthentication';
import HandleSavedListsApi from '../api/fetchSavedLists';

import CurrentUserContext from '../Contexts/CurrentUserContext';


function App() {

    const [currentUser, setCurrentUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [registerMessage, setRegisterMessage] = useState(null);
    const [isAuthorizationPanelHidden, setAuthorizationPanelHidden] = useState(true)

    useEffect(() => {setRegisterMessage();}, []);

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && accessToken) {
        setCurrentUser(user)
        setAccessToken(accessToken)
      }
    }, []);

    const handleLogging = (userInfo) => {
      AuthenticationApi.login(userInfo)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("accessToken", response.accessToken);
        const user = JSON.parse(localStorage.getItem('user'))
        const accessToken = localStorage.getItem('accessToken')
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
        localStorage.setItem("user", JSON.stringify(response));
        const user = JSON.parse(localStorage.getItem('user'))
        setCurrentUser(user)
      })
      .catch((error) => {
        console.log(error.message)
      })
    }

    const editCurrentSavedList = (pickedItems, currentList) => {
      HandleSavedListsApi.updateList(pickedItems, currentUser, currentList)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        const user = JSON.parse(localStorage.getItem('user'))
        setCurrentUser(user)
      })
      .catch((error) => {
        console.log(error.message)
      })
    }

    const deleteCurrentSavedList = (currentList) => {
      HandleSavedListsApi.deleteList(currentUser, currentList)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        const user = JSON.parse(localStorage.getItem('user'))
        setCurrentUser(user)
      })
      .catch((error) => {
        console.log(error.message)
      })
    }

    return (
      isAuthorizationPanelHidden ? 
      <CurrentUserContext.Provider value={{currentUser:currentUser, onCurrentUserChange: setCurrentUser}}>
        <AppContent onAuthChange={handleAuthChange} onSave={addCurrentPackingListToSavedLists} onEdit={editCurrentSavedList} onDelete={deleteCurrentSavedList}/> 
      </CurrentUserContext.Provider> : 
      <AuthenticationPage onLogin={handleLogging} onRegister={handleRegistration} registerMessage={registerMessage}/>
    )
}

export default App
