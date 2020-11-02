import React, { useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import {ThemeProvider} from "styled-components";
import GlobalStyle from '../Components/GlobalStyle';
import { lightTheme, darkTheme } from "../theme/Themes";

import ToggleButton from '../Components/ToggleButton';
import AppContent from '../Components/AppContent';
import LoginPanel from '../Components/LoginPanel';
import RegistrationPanel from '../Components/RegistrationPanel';

import PopUpInfo from './PopUpInfo';
import { setPopup, setInitialState, fetchCurrentUser, addListToUserAccount, updateListInUserAccount, removeListFromUserAccount } from '../actions';
import {getTheme, getPopupState, getUser, getPickedItems, getCurrentList} from '../reducers';


function App() {

    const dispatch = useDispatch()
    const theme = useSelector(getTheme)
    const isPopupVisible = useSelector(getPopupState)
    const currentUser = useSelector(getUser)
    const pickedItems = useSelector(getPickedItems)
    const currentList = useSelector(getCurrentList)

    useEffect(() => {
      if (currentUser) {
        dispatch(fetchCurrentUser(currentUser))}
      }, []);

    const addCurrentListToSavedLists = () => {
      const accessToken = currentUser.accessToken
      dispatch(addListToUserAccount(pickedItems, currentUser, currentList, accessToken))
    }

    const editCurrentSavedList = () => {
      const accessToken = currentUser.accessTokenl
      dispatch(updateListInUserAccount(pickedItems, currentUser, currentList, accessToken))
    }

    const deleteCurrentSavedList = () => {
      const accessToken = currentUser.accessToken
      dispatch(removeListFromUserAccount(pickedItems, currentUser, currentList, accessToken))
    }

    const handlePopUpWindow = () => {
      dispatch(setPopup())
      dispatch(setInitialState())
    }

    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}> 
        <GlobalStyle />
        <ToggleButton />
        <Router>
        <Switch>
          <Route exact path="/">
                <AppContent onSave={addCurrentListToSavedLists} onEdit={editCurrentSavedList} onDelete={deleteCurrentSavedList}/>
                {isPopupVisible && (<PopUpInfo onClose={handlePopUpWindow}/>)}
          </Route>
          <Route path="/login">
                <LoginPanel/>
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
