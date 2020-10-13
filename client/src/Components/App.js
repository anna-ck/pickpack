import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import AppContent from '../Components/AppContent';
import LoginPanel from '../Components/LoginPanel';
import RegistrationPanel from '../Components/RegistrationPanel';

import AuthenticationApi from '../api/fetchAuthentication';
import HandleSavedListsApi from '../api/fetchSavedLists';

import CurrentUserContext from '../Contexts/CurrentUserContext';


function App() {

    const [currentUser, setCurrentUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [registerMessage, setRegisterMessage] = useState(null);

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
      <Router>
      <Switch>
        <Route exact path="/">
            <CurrentUserContext.Provider value={{currentUser:currentUser, onCurrentUserChange: setCurrentUser}}>
                <AppContent onAuthChange={handleAuthChange} onSave={addCurrentPackingListToSavedLists} onEdit={editCurrentSavedList} onDelete={deleteCurrentSavedList}/> 
            </CurrentUserContext.Provider>
        </Route>
        <Route path="/login">
              <LoginPanel onLogin={handleLogging}/>
        </Route>
        <Route path="/register">
              <RegistrationPanel onRegister={handleRegistration} registerMessage={registerMessage}/>
        </Route>
      </Switch>
      </Router>
    )
}

export default App
