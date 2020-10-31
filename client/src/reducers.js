const initialState = {
    theme: 'light',
    currentUser: null,
    isPopUpVisible: false,
    pickedItems: [],
    searchResults: [],
    currentSearchList: '',
    isBurgerActive: true,
    currentList: {listName: '', id: ''},
    wasCurrentListModified: false,
    isUserBarActive: false,
    idOfCurrentlyChangedList: null,
}

export function appReducer (state = initialState, action) {
    switch (action.type) {
        case "THEME_CHANGE": {
            const previousTheme = state.theme
            let theme = ''
            if (previousTheme === 'light') {
                theme = 'dark'
            }
            else {
                theme = 'light'
            }
            return {...state, theme}
        }

        case "POPUP_UPDATE": {
            const newPopUpVisible = !state.isPopUpVisible
            return {...state, isPopUpVisible: newPopUpVisible}
        }

        case "USER_SET": {
           const {currentUser} = action;
           return {...state, currentUser}
        }

        case 'PICKEDITEMS_SET': {
            const {pickedItems} = action;
            return {...state, pickedItems}
        }

        case 'PICKEDITEMS_ADD': {
            const {item} = action;
            const pickedItems = [...state.pickedItems, item]
            return {...state, pickedItems}
        }

        case 'PICKEDITEMS_DELETE': {
            const {item} = action;
            const pickedItems = state.pickedItems.filter((pickedItem => pickedItem.name !== item.name))
            return {...state, pickedItems}
        }

        case 'PICKEDITEMS_UPDATE': {
            const {itemToUpdate} = action;
            const pickedItems = state.pickedItems.map((pickedItem) =>
            pickedItem.id === itemToUpdate.id ? itemToUpdate : pickedItem )
            return {...state, pickedItems}
        }

        case 'SEARCHRESULTS_CHANGE': {
            const {items} = action;
            return {...state, searchResults: items}
        }

        case 'CURRENTSEARCHLIST_SET': {
            const {list} = action;
            return {...state, currentSearchList: list}
        }

        case 'BURGER_UPDATE': {
            const newBurgerState = !state.isBurgerActive
            return {...state, isBurgerActive: newBurgerState}
        }

        case 'CURRENTLIST_SET': {
            const {currentList} = action
            return {...state, currentList}
        }

        case 'CURRENTLISTMODIFICATION_CONFIRM': {
            return {...state, wasCurrentListModified: true}
        }

        case 'CURRENTLISTMODIFICATION_DENY': {
            return {...state, wasCurrentListModified: false}
        }

        case 'USERBAR_SET': {
            const {status} = action;
            return {...state, isUserBarActive: status}
        }

        case 'CURRENTLYCHANGEDLIST_SET': {
            const {id} = action;
            return {...state, idOfCurrentlyChangedList: id}
        }

        case 'INITIALSTATE_SET': {
            return initialState
        }

        default:
            return state
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
