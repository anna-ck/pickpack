import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useHistory } from "react-router-dom";

import {ThemeProvider} from "styled-components";
import GlobalStyle from '../theme/globalStyles';
import { lightTheme, darkTheme } from "../theme/Themes";
import styled from 'styled-components';

import ToggleButton from '../Components/ToggleButton';
import AppContent from '../Components/AppContent';
import LoginPanel from '../Components/LoginPanel';
import RegistrationPanel from '../Components/RegistrationPanel';

import AuthenticationApi from '../api/fetchAuthentication';
import HandleSavedListsApi from '../api/fetchSavedLists';

import CurrentUserContext from '../Contexts/CurrentUserContext';
import PopUpInfo from './PopUpInfo';


function App() {

    const [theme, setTheme] = useState('light');
    const [currentUser, setCurrentUser] = useState(null)
    const [isPopupVisible, setPopupVisible] = useState(false)
    //const [accessToken, setAccessToken] = useState(null)
    //const [registerMessage, setRegisterMessage] = useState(null);

    const history = useHistory();

    //useEffect(() => {setRegisterMessage();}, []);

    useEffect(() => {
      //const accessToken = localStorage.getItem('accessToken');
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        AuthenticationApi.getCurrentUser(user)
        .then((response) => {
          if (response) {
            setCurrentUser(response)
            console.log('1')
          }
          else {
            //handleAuthChange()
            setPopupVisible(true)
            //setCurrentUser(user)
            console.log('2')
          }
        })
      }
    }, []);

    const handleLogging = (response) => {
        localStorage.setItem("user", JSON.stringify(response));
        //localStorage.setItem("accessToken", response.accessToken);
        const user = JSON.parse(localStorage.getItem('user'))
        //const accessToken = localStorage.getItem('accessToken')
        setCurrentUser(user)
        //setAccessToken(accessToken)
    }

    const handleAuthChange = () => {
      localStorage.removeItem("pickedItems");
      localStorage.removeItem("currentList");
      if (currentUser) {
        localStorage.removeItem("user");
        //localStorage.removeItem('accessToken')
        setCurrentUser(null)
        //setAccessToken(null)
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

    const toggleTheme = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light')
    };

    const handlePopUp = () => {
      setPopupVisible(false)
      handleAuthChange()
    }

    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}> 
      <GlobalStyle />
      <ToggleButton onClick={toggleTheme}/>
      <Router>
      <Switch>
        <Route exact path="/">
            <CurrentUserContext.Provider value={{currentUser:currentUser, onCurrentUserChange: setCurrentUser}}>
                <AppContent onAuthChange={handleAuthChange} onSave={addCurrentPackingListToSavedLists} onEdit={editCurrentSavedList} onDelete={deleteCurrentSavedList}/>
                {isPopupVisible && (<PopUpInfo onClosePopUp={handlePopUp}/>)}
            </CurrentUserContext.Provider>
        </Route>
        <Route path="/login">
              <LoginPanel onLogin={handleLogging}/>
        </Route>
        <Route path="/register">
              <RegistrationPanel/>
        </Route>
      </Switch>
      </Router>
      </ThemeProvider>
    )
}

export default App
