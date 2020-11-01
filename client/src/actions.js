import AuthenticationApi from './api/fetchAuthentication';
import HandleSavedListsApi from './api/fetchSavedLists';

export const changeTheme = () => 
    ({type: 'THEME_CHANGE'})
;

export const setPopup = () =>
    ({type: 'POPUP_UPDATE'})
;

export const setUser = (user) =>
    ({type: 'USER_SET', currentUser: user})
;

export const setPickedItems = (items) => 
    ({type: 'PICKEDITEMS_SET', pickedItems: items})
;

export const addPickedItem = (item) => 
    ({type: 'PICKEDITEMS_ADD', item})
;

export const deletePickedItem = (item) => 
    ({type: 'PICKEDITEMS_DELETE', item})
;

export const updatePickedItem = (item) => 
    ({type: 'PICKEDITEMS_UPDATE', itemToUpdate: item})
;

export const setSearchResults = (items) => 
    ({type: 'SEARCHRESULTS_CHANGE', items})
;

export const setCurrentSearchList = (list) => 
    ({type: 'CURRENTSEARCHLIST_SET', list})
;

export const setBurger= () =>
    ({type: 'BURGER_UPDATE'})
;

export const setCurrentList= (list) =>
    ({type: 'CURRENTLIST_SET', currentList: list})
;

export const confirmListModification= () =>
    ({type: 'CURRENTLISTMODIFICATION_CONFIRM', wasModified: true})
;

export const denyListModification= () =>
    ({type: 'CURRENTLISTMODIFICATION_DENY', wasModified: false})
;

export const setUserBar= (status) =>
    ({type: 'USERBAR_SET', status})
;

export const setIdOfCurrentlyChangedList= (id) =>
    ({type: 'CURRENTLYCHANGEDLIST_SET', id})
;

export const setInitialState = () =>
    ({type: 'INITIALSTATE_SET'})
;

export const fetchCurrentUser = (currentUser) => (dispatch) => {
    AuthenticationApi.getCurrentUser(currentUser)
        .then((response) => {
          if (response) {
            dispatch(setUser(response))
          }
          else {
            dispatch(setPopup())
            dispatch(setPickedItems([]))
          }
        })
}

export const addListToUserAccount = (pickedItems, currentUser, currentList, accessToken) => (dispatch) => {
    HandleSavedListsApi.addList(pickedItems, currentUser, currentList)
      .then((response) => {
        response.accessToken = accessToken
        dispatch(setUser(response))
      })
      .catch((error) => {
        console.log(error.message)
      })
}

export const updateListInUserAccount = (pickedItems, currentUser, currentList, accessToken) => (dispatch) => {
    HandleSavedListsApi.updateList(pickedItems, currentUser, currentList)
      .then((response) => {
        response.accessToken = accessToken
        dispatch(setUser(response))
      })
      .catch((error) => {
        console.log(error.message)
      })
}

export const removeListFromUserAccount = (pickedItems, currentUser, currentList, accessToken) => (dispatch) => {
    HandleSavedListsApi.deleteList(currentUser, currentList)
       .then((response) => {
          response.accessToken = accessToken
          dispatch(setUser(response))
       })
       .catch((error) => {
          console.log(error.message)
       })
}