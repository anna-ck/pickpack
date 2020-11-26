import React, { useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import {ThemeProvider} from "styled-components";
import GlobalStyle from '../Components/GlobalStyle';
import { lightTheme, darkTheme } from "../theme/Themes";

import ToggleButton from './ToggleButton/ToggleButton';
import {MainPage} from './MainPage';
import {LoginPage} from './LoginPage';
import {RegistrationPage} from '../Components/RegisterPage';

import {PopUpInfo} from './PopUpInfo';
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
      const accessToken = currentUser.accessToken
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
                <MainPage onSave={addCurrentListToSavedLists} onEdit={editCurrentSavedList} onDelete={deleteCurrentSavedList}/>
                {isPopupVisible && (<PopUpInfo onClose={handlePopUpWindow}/>)}
          </Route>
          <Route path="/login">
                <LoginPage/>
          </Route>
          <Route path="/register">
                <RegistrationPage/>
          </Route>
        </Switch>
        </Router>
      </ThemeProvider>
    )
}

export default App
