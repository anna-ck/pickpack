import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'

import './index.css';
import App from './Components/App';
import {loadState, saveState} from './localStorage';
import * as serviceWorker from './serviceWorker';

import {appReducer} from './reducers'

const persistedState = loadState()
const store = createStore(appReducer, persistedState, applyMiddleware(thunk))

store.subscribe(() => {
  saveState({
    currentUser: store.getState().currentUser,
    pickedItems: store.getState().pickedItems,
    currentList: store.getState().currentList,
    theme: store.getState().theme,
    isPopUpVisible: store.getState().isPopUpVisible,
    searchResults: store.getState().searchResults,
    currentSearchList: store.getState().currentSearchList,
    isBurgerActive: store.getState().isBurgerActive,
    wasCurrentListModified: store.getState().wasCurrentListModified,
    isUserBarActive: store.getState().isUserBarActive,
    idOfCurrentlyChangedList: store.getState().idOfCurrentlyChangedList,
  })
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

document.cookie = 'cookie1=value1; SameSite=Lax';
