import {createStore} from 'redux';
import userReducer, { getUser } from '../reducers/userReducer'
import currentListReducer, {getCurrentList} from '../reducers/currentListReducer'
import burgerReducer, {isBurgerActive} from '../reducers/burgerReducer'
import changedListReducer, {getIdOfCurrentlyChangedList} from '../reducers/changedListReducer';
import changesReducer, {isCurrentListModified} from '../reducers/changesReducer';
import currentSearchListReducer, {getCurrentSearchList} from '../reducers/currentSearchListReducer';
import pickedItemsReducer, {getPickedItems} from '../reducers/pickedItemsReducer';
import popUpReducer, {getPopupState} from '../reducers/popUpReducer'
import searchResultsReducer, {getSearchResults} from '../reducers/searchResultsReducer';
import themeReducer, {getTheme} from '../reducers/themeReducer'
import userBarReducer, {isUserBarVisible} from '../reducers/userBarReducer';
import {setUser, setInitialState, setCurrentList, setBurger, changeTheme, setPopup, setPickedItems, addPickedItem, deletePickedItem, updatePickedItem, setSearchResults, setCurrentSearchList, confirmListModification, denyListModification, setUserBar, setIdOfCurrentlyChangedList} from '../actions'

let store = null;
describe('user state changes', () => {
    beforeEach(() => {
        store = createStore(userReducer)
    });
    test('user should be initially null', () => {
        const user = getUser(store.getState())
        expect(user).toEqual(null)
    });
    test('set user action creates new user', () => {
        const newUser = {currentUser: 'user'}
        store.dispatch(setUser(newUser))
        const user = getUser(store.getState())
        expect(user).toEqual(newUser)
    });
    test('set initial state action removes user', () => {
        store.dispatch(setInitialState())
        const user = getUser(store.getState())
        expect(user).toEqual(null)
    });
});

describe('pickedItems state changes', () => {
    beforeEach(() => {
        store = createStore(pickedItemsReducer)
    });
    test('pickedItems should be initially an empty array', () => {
        const pickedItems = getPickedItems(store.getState())
        expect(pickedItems).toEqual([])
    });
    test('set pickedItems action creates new array of items', () => {
        const testPickedItems = ['a', 'b', 'c']
        store.dispatch(setPickedItems(testPickedItems))
        const pickedItems = getPickedItems(store.getState())
        expect(pickedItems).toEqual(['a', 'b', 'c'])
    });
    test('add item action adds new item to pickedItems array', () => {
        const testPickedItems = ['a', 'b', 'c']
        store.dispatch(setPickedItems(testPickedItems))
        const newItem = 'd'
        store.dispatch(addPickedItem(newItem))
        const pickedItems = getPickedItems(store.getState())
        expect(pickedItems).toEqual(['a', 'b', 'c', 'd'])
    });
    test('delete item action removes new item from pickedItems array', () => {
        const testPickedItems = [{name:'a'}, {name:'b'}, {name:'c'}, {name:'d'}]
        store.dispatch(setPickedItems(testPickedItems))
        const itemToRemove = {name:'c'}
        store.dispatch(deletePickedItem(itemToRemove))
        const pickedItems = getPickedItems(store.getState())
        expect(pickedItems).toEqual([{name:'a'}, {name:'b'}, {name:'d'}])
    });
    test('update item action modifies pickedItems array', () => {
        const testPickedItems = [{id:1, name:'a'}, {id:2, name:'b'}, {id:3, name:'c'}, {id:4, name:'d'}]
        store.dispatch(setPickedItems(testPickedItems))
        const itemToUpdate = {id:3, name:'ccc'}
        store.dispatch(updatePickedItem(itemToUpdate))
        const pickedItems = getPickedItems(store.getState())
        expect(pickedItems).toEqual([{id:1, name:'a'}, {id:2, name:'b'}, {id:3, name:'ccc'}, {id:4, name:'d'}])
    });
    test('set initial state action removes picked`items', () => {
        store.dispatch(setInitialState())
        const pickedItems = getPickedItems(store.getState())
        expect(pickedItems).toEqual([])
    });
});

describe('current list state changes', () => {
    beforeEach(() => {
        store = createStore(currentListReducer)
    });
    test('current list should be initially an object with empty listName and id', () => {
        const currentList = getCurrentList(store.getState())
        expect(currentList).toEqual({ listName: '', id: '' })
    });
    test('set currentList action creates new currentList', () => {
        const newCurrentList = {currentList: { listName: 'test', id: '1' }}
        store.dispatch(setCurrentList(newCurrentList))
        const currentList = getCurrentList(store.getState())
        expect(currentList).toEqual(newCurrentList)
    });
    test('set initial state action removes currentList', () => {
        store.dispatch(setInitialState())
        const currentList = getCurrentList(store.getState())
        expect(currentList).toEqual({ listName: '', id: '' })
    });
});

describe('burger state changes', () => {
    beforeEach(() => {
        store = createStore(burgerReducer)
    });
    test('burger should be initially true', () => {
        const burger = isBurgerActive(store.getState())
        expect(burger).toBe(true)
    });
    test('set burger action changes boolean value', () => {
        const oldBurger = isBurgerActive(store.getState())
        store.dispatch(setBurger())
        const newBurger = isBurgerActive(store.getState())
        expect(newBurger).toBe(!oldBurger)
    });
    test('set initial state action sets burger to true', () => {
        store.dispatch(setInitialState())
        const burger = isBurgerActive(store.getState())
        expect(burger).toBe(true)
    });
});

describe('IdOfCurrentlyChangedList state changes', () => {
    beforeEach(() => {
        store = createStore(changedListReducer)
    });
    test('IdOfCurrentlyChangedList should be initially null', () => {
        const newCurrentlyChangedListId = getIdOfCurrentlyChangedList(store.getState())
        expect(newCurrentlyChangedListId).toEqual(null)
    });
    test('set currently changed list action creates new currently changed list', () => {
        store.dispatch(setIdOfCurrentlyChangedList(10))
        const newCurrentlyChangedListId = getIdOfCurrentlyChangedList(store.getState())
        expect(newCurrentlyChangedListId).toEqual(10)
    });
    test('set initial state action sets IdOfCurrentlyChangedList to null', () => {
        store.dispatch(setInitialState())
        const newCurrentlyChangedListId = getIdOfCurrentlyChangedList(store.getState())
        expect(newCurrentlyChangedListId).toEqual(null)
    });
});

describe('list modification state changes', () => {
    beforeEach(() => {
        store = createStore(changesReducer)
    });
    test('isCurrentListModified should be initially false', () => {
        const state = isCurrentListModified(store.getState())
        expect(state).toBe(false)
    });
    test('confirmListModification action sets true', () => {
        store.dispatch(confirmListModification())
        const state = isCurrentListModified(store.getState())
        expect(state).toBe(true)
    });
    test('denyListModification action sets false', () => {
        store.dispatch(denyListModification())
        const state = isCurrentListModified(store.getState())
        expect(state).toBe(false)
    });
    test('set initial state action sets list modification state to false', () => {
        store.dispatch(setInitialState())
        const state = isCurrentListModified(store.getState())
        expect(state).toBe(false)
    });
});

describe('popup state changes', () => {
    beforeEach(() => {
        store = createStore(popUpReducer)
    });
    test('popup should be initially false', () => {
        const popup = getPopupState(store.getState())
        expect(popup).toBe(false)
    });
    test('set setPopup action changes boolean value', () => {
        const oldPopUp = getPopupState(store.getState())
        store.dispatch(setPopup())
        const newPopUp = getPopupState(store.getState())
        expect(newPopUp).toBe(!oldPopUp)
    });
    test('set initial state action sets popup to false', () => {
        store.dispatch(setInitialState())
        const popup = getPopupState(store.getState())
        expect(popup).toBe(false)
    });
});

describe('searchResults state changes', () => {
    beforeEach(() => {
        store = createStore(searchResultsReducer)
    });
    test('searchResults should be initially an empty array', () => {
        const searchResults = getSearchResults(store.getState())
        expect(searchResults).toEqual([])
    });
    test('set searchResults action changes array', () => {
        const testArray = ['a', 'b', 'c']
        store.dispatch(setSearchResults(testArray))
        const searchResults = getSearchResults(store.getState())
        expect(searchResults).toEqual(testArray)
    });
    test('set initial state action sets searchResults to  an empty array', () => {
        store.dispatch(setInitialState())
        const searchResults = getSearchResults(store.getState())
        expect(searchResults).toEqual([])
    });
});

describe('currentSearchList state changes', () => {
    beforeEach(() => {
        store = createStore(currentSearchListReducer)
    });
    test('currentSearchList should be initially an empty string', () => {
        const currentSearchList = getCurrentSearchList(store.getState())
        expect(currentSearchList).toEqual('')
    });
    test('set currentSearchList action changes list name', () => {
        const listName = 'test'
        store.dispatch(setCurrentSearchList(listName))
        const currentSearchList = getCurrentSearchList(store.getState())
        expect(currentSearchList).toEqual(listName)
    });
    test('set initial state action sets currentSearchList to  an empty string', () => {
        store.dispatch(setInitialState())
        const currentSearchList = getCurrentSearchList(store.getState())
        expect(currentSearchList).toEqual('')
    });
});

describe('theme state changes', () => {
    beforeEach(() => {
        store = createStore(themeReducer)
    });
    test('theme should be initially light', () => {
        const theme = getTheme(store.getState())
        expect(theme).toEqual('light')
    });
    test('set theme action changes theme', () => {
        const oldTheme = getTheme(store.getState())
        store.dispatch(changeTheme())
        const newTheme = getTheme(store.getState())
        if (oldTheme === 'light') {
            expect(newTheme).toBe('dark')
        }
        else {
            expect(newTheme).toBe('light')
        }
    });
    test('set initial state action sets theme to light', () => {
        store.dispatch(setInitialState())
        const theme = getTheme(store.getState())
        expect(theme).toEqual('light')
    });
});

describe('userBar state changes', () => {
    beforeEach(() => {
        store = createStore(userBarReducer)
    });
    test('userBar should be initially false', () => {
        const userBar = isUserBarVisible(store.getState())
        expect(userBar).toBe(false)
    });
    test('set userBar action changes boolean value', () => {
        store.dispatch(setUserBar(true))
        let userBar = isUserBarVisible(store.getState())
        expect(userBar).toEqual(true)
        store.dispatch(setUserBar(false))
        userBar = isUserBarVisible(store.getState())
        expect(userBar).toEqual(false)
    });
    test('set initial state action sets userBar to false', () => {
        store.dispatch(setInitialState())
        const userBar = isUserBarVisible(store.getState())
        expect(userBar).toBe(false)
    });
});

