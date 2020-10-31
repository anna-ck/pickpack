import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import {ThemeProvider} from "styled-components";
import GlobalStyle from '../theme/globalStyles';
import { lightTheme, darkTheme } from "../theme/Themes";

import ToggleButton from '../Components/ToggleButton';
import AppContent from '../Components/AppContent';
import LoginPanel from '../Components/LoginPanel';
import RegistrationPanel from '../Components/RegistrationPanel';

import AuthenticationApi from '../api/fetchAuthentication';
import HandleSavedListsApi from '../api/fetchSavedLists';

//import CurrentUserContext from '../Contexts/CurrentUserContext';
import PopUpInfo from './PopUpInfo';
import { setPickedItems, setPopup, setUser, setInitialState, fetchCurrentUser, addListToUserAccount, updateListInUserAccount, removeListFromUserAccount } from '../actions';
import {getTheme, getPopupState, getUser, getPickedItems, getCurrentList} from '../reducers';


function App() {

    //const [theme, setTheme] = useState('light');
    //const [currentUser, setCurrentUser] = useState(null)
    //const [isPopupVisible, setPopupVisible] = useState(false)

    //const history = useHistory();

    const dispatch = useDispatch()
    const theme = useSelector(getTheme)
    const isPopupVisible = useSelector(getPopupState)
    const currentUser = useSelector(getUser)
    const pickedItems = useSelector(getPickedItems)
    const currentList = useSelector(getCurrentList)

    useEffect(() => {
      //const user = JSON.parse(sessionStorage.getItem('user'))
      if (currentUser) {
        dispatch(fetchCurrentUser(currentUser))}
      }, []);

    const handleAuthChange = () => { 
      //sessionStorage.removeItem("pickedItems");
      //sessionStorage.removeItem("currentList");
      //if (currentUser) {
        //sessionStorage.removeItem("user");
        dispatch(setInitialState())
      //}

    }

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
      //sessionStorage.removeItem("user");
      handleAuthChange()
    }

    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}> 
        <GlobalStyle />
        <ToggleButton />
        <Router>
        <Switch>
          <Route exact path="/">
                  <AppContent onAuthChange={handleAuthChange} onSave={addCurrentListToSavedLists} onEdit={editCurrentSavedList} onDelete={deleteCurrentSavedList}/>
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
