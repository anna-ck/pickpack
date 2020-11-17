import burgerReducer, * as burgerSelectors from './burgerReducer';
import changedListReducer, * as changedListSelectors from './changedListReducer';
import changesReducer,* as changesSelectors from './changesReducer';
import currentListReducer, * as currentListSelectors from './currentListReducer';
import currentSearchListReducer, * as currentSearchListSelectors from './currentSearchListReducer';
import pickedItemsReducer, * as pickedItemsSelectors from './pickedItemsReducer';
import popUpReducer, * as popUpSelectors from './popUpReducer'
import searchResultsReducer, * as searchResultsSelectors from './searchResultsReducer';
import themeReducer, * as themeSelectors from './themeReducer'
import userBarReducer, * as userBarSelectors from './userBarReducer';
import userReducer, * as userSelectors from './userReducer';

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

export const getTheme = (state) => themeSelectors.getTheme(state.theme)
export const getPopupState = (state) => popUpSelectors.getPopupState(state.isPopUpVisible)
export const getUser = (state) => userSelectors.getUser(state.currentUser)
export const getPickedItems = (state) => pickedItemsSelectors.getPickedItems(state.pickedItems)
export const getCurrentSearchList = (state) => currentSearchListSelectors.getSearchResults(state.currentSearchList)
export const isBurgerActive = (state) => burgerSelectors.isBurgerActive(state.isBurgerActive)
export const getCurrentList = (state) => currentListSelectors.getCurrentList(state.currentList)
export const isCurrentListModified = (state) => changesSelectors.isCurrentListModified(state.isCurrentListModified)
export const isUserBarVisible = (state) => userBarSelectors.isUserBarVisible(state.isUserBarActive)
export const getIdOfCurrentlyChangedList = (state) => changedListSelectors.getIdOfCurrentlyChangedList(state.idOfCurrentlyChangedList)
export const getSearchResults = (state) => searchResultsSelectors.getSearchResults(state.searchResults)
