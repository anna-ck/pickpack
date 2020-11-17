import burgerReducer from './burgerReducer';
import changedListReducer from './changedListReducer';
import changesReducer from './changesReducer';
import currentListReducer from './currentListReducer';
import currentSearchListReducer from './currentSearchListReducer';
import pickedItemsReducer from './pickedItemsReducer';
import popUpReducer from './popUpReducer'
import searchResultsReducer from './searchResultsReducer';
import themeReducer from './themeReducer'
import userBarReducer from './userBarReducer';
import userReducer from './userReducer';

export function rootReducer (state = {}, action) {
    return {
        theme: themeReducer(state.theme, action),
        currentUser: userReducer(state.currentUser, action),
        isPopUpVisible: popUpReducer(state.isPopUpVisible, action),
        pickedItems: pickedItemsReducer(state.pickedItems, action),
        searchResults: searchResultsReducer(state.searchResults, action),
        currentSearchList: currentSearchListReducer(state.currentSearchList, action),
        isBurgerActive: burgerReducer(state.isBurgerActive, action),
        currentList: currentListReducer(state.currentList, action),
        wasCurrentListModified: changesReducer(state.wasCurrentListModified, action),
        isUserBarActive: userBarReducer(state.isUserBarActive, action),
        idOfCurrentlyChangedList: changedListReducer(state.idOfCurrentlyChangedList, action),
    }
}


export const getTheme = (state) => {
    return state.theme
}

export const getPopupState = (state) => {
    return state.isPopUpVisible
}

export const getUser = (state) => {
    return state.currentUser
}

export const getPickedItems = (state) => {
    return state.pickedItems
}

export const getSearchResults = (state) => {
    return state.searchResults
}

export const getCurrentSearchList = (state) => {
    return state.currentSearchList
}

export const isBurgerActive = (state) => {
    return state.isBurgerActive
}

export const getCurrentList = (state) => {
    return state.currentList
}

export const isCurrentListModified = (state) => {
    return state.wasCurrentListModified
}

export const isUserBarVisible = (state) => {
    return state.isUserBarActive
}

export const getIdOfCurrentlyChangedList = (state) => {
    return state.idOfCurrentlyChangedList
}
