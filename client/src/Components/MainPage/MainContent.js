import React, { useRef }  from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import {Header} from './Header';
import {SearchInput} from './AppContent/SearchInput';
import {BurgerIcon} from './AppContent/BurgerIcon';
import Menu from './AppContent/Menu';
import Results from './AppContent/Results';
import {FinalList} from './AppContent/FinalList';
import Footer from './Footer';
import {UserPanel} from './UserPanel';
import {StrangerGreeting} from './StrangerGreeting';
import {ModalWarning} from './ModalWarning'

import { v4 as uuidv4 } from 'uuid';

import handleSearchResultsApi from '../../api/fetchSearchResults';

import { setPickedItems, addPickedItem, deletePickedItem, updatePickedItem, setSearchResults, setCurrentSearchList, setBurger, setCurrentList, confirmListModification, denyListModification, setUserBar, setIdOfCurrentlyChangedList, setInitialState } from '../../actions';
import {getUser, getPickedItems, getCurrentList, isCurrentListModified, isUserBarVisible, getIdOfCurrentlyChangedList} from '../../reducers';

import {AppContentWrapper, ToggleUserButton, Icon, UserBar, Content, MainContentDiv, ContentSearch, ContentSearchInput, ContentSearchResults, ContentFinal, ButtonsWrapper} from './MainContentStyles'

const SaveListButton = React.lazy(() => import('./ActionButtons/SaveListButton'));
const DeleteListButton = React.lazy(() => import('./ActionButtons/DeleteListButton'));
const PrintListButton = React.lazy(() => import('./ActionButtons/PrintListButton'));

function MainContent(props) {

    const menuRef = useRef(0);
    const resultsRef = useRef(0);
    const finalListRef = useRef();

    const history = useHistory();

    const dispatch = useDispatch()

    const currentUser = useSelector(getUser)
    const pickedItems = useSelector(getPickedItems)
    const currentList = useSelector(getCurrentList)
    const wasCurrentListModified = useSelector(isCurrentListModified)
    const isUserBarActive = useSelector(isUserBarVisible)
    const idOfListBeingCurrentlyModified = useSelector(getIdOfCurrentlyChangedList)

    const changePickedItems = (item) => {
      if (item.number !== '0') {
        const indexOfItemToUpdate = pickedItems.findIndex((pickedItem) => pickedItem.name === item.name);
        if (indexOfItemToUpdate > -1) {
            if (item.number !== 0) {
              dispatch(updatePickedItem(item))
            }
            else {
              dispatch(deletePickedItem(item))
            }
        }
        else {
          item.id = uuidv4()
          item.description = ''
          dispatch(addPickedItem(item))
          dispatch(confirmListModification())
        }
      }
      else {
        dispatch(deletePickedItem(item))
      }
    }

    const searchResults = (listName) => {
        handleSearchResultsApi.getItemsByListName(listName)
        .then((result) => {
          const items = result[0].items
          dispatch(setSearchResults(items))
          dispatch(setCurrentSearchList(listName))
          if (window.innerWidth < 760) {
            openBurger()
          }
       })
    };

    const openBurger = () => {
      resultsRef.current.style.display === 'none' || resultsRef.current.style.display === '' ? resultsRef.current.style.display = 'block' : resultsRef.current.style.display = 'none';
      menuRef.current.style.display === '' ||  menuRef.current.style.display === 'block' ? menuRef.current.style.display = 'none' : menuRef.current.style.display = 'block';
      dispatch(setBurger())
    }

    const handleAuthChange = () => {
      dispatch(setInitialState())
      if (currentUser) {
        history.push("/");
      }
      else {
        history.push("/login");
      }
    }

    const handleListSaving = () => {
      if (pickedItems.length > 0) {
        const name = currentList.listName
        const id = uuidv4()
        currentList.id = id
        props.onSave()
        dispatch(denyListModification())
        dispatch(setCurrentList({listName: name, id: id}))
      }
    }

    const handleListEditing = () => {
      props.onEdit()
      dispatch(denyListModification())
    }

    const handleCurrentListNameChange = (name) => {
      dispatch(setCurrentList({listName: name, id: currentList.id}))
      dispatch(confirmListModification())
    }

    const openNewList = () => {
      dispatch(setPickedItems([]))
      dispatch(setCurrentList({listName: '', id: ''}))
      dispatch(denyListModification())
    }

    const saveCurrentListAndOpenNewList = async () => {
      if (currentList.id) {
        handleListEditing()
      }
      else {
        handleListSaving()
      }
      dispatch(setCurrentList({listName: '', id: ''}))
      dispatch(denyListModification())
      dispatch(setPickedItems([]))
    }

    const saveCurrentListAndOpenSavedList = async () => {
      if (currentList.id) {
        handleListEditing()
      }
      else {
        handleListSaving()
      }
      const savedLists = currentUser.savedLists
      const listToReturn = savedLists.find(list => list.id === idOfListBeingCurrentlyModified)
      dispatch(setPickedItems(listToReturn.items))
      dispatch(setCurrentList({listName: listToReturn.listName, id: listToReturn.id}))
      dispatch(denyListModification())
      dispatch(setUserBar(false))
      dispatch(setIdOfCurrentlyChangedList(null))
    }

    const openSavedList = async () => {
      const savedLists = currentUser.savedLists
      const listToReturn = savedLists.find(list => list.id === idOfListBeingCurrentlyModified)
      dispatch(setPickedItems(listToReturn.items))
      dispatch(setCurrentList({listName: listToReturn.listName, id: listToReturn.id}))
      dispatch(denyListModification())
      dispatch(setUserBar(false))
      dispatch(setIdOfCurrentlyChangedList(null))
    }

    const handleListDeleting = () => {
      props.onDelete()
      dispatch(denyListModification())
      dispatch(setCurrentList({listName: '', id: ''}))
      dispatch(setPickedItems([]))
    }

    const toggleUserBarState = () => {
      const currentBarStatus = !isUserBarActive
      dispatch(setUserBar(currentBarStatus))
    }

    return (
      <>
        <ToggleUserButton isActive={!isUserBarActive} currentUser={currentUser} onClick={toggleUserBarState}><Icon className="fas fa-user-circle"></Icon>{currentUser ? ` You are logged in as ${currentUser.login}` : null}</ToggleUserButton>
        <AppContentWrapper>
          {currentUser ? 
          <UserBar currentUser={currentUser} isActive={isUserBarActive}>
            <UserPanel onAuthChange={handleAuthChange} onClick={toggleUserBarState}/>
          </UserBar> : 
          <StrangerGreeting onAuthChange={handleAuthChange}/>}
          <Content currentUser={currentUser} isActive={!isUserBarActive}>
              <Header/>
              <MainContentDiv>
                <ContentSearch>
                  <ContentSearchInput>
                    <SearchInput onAdd={changePickedItems}/>
                  </ContentSearchInput>
                  <BurgerIcon onClick={openBurger}></BurgerIcon>
                  <ContentSearchResults>
                    <Menu ref={menuRef} handleChoice={searchResults} />
                    <Results ref={resultsRef} onCheck={changePickedItems} />
                  </ContentSearchResults>
                </ContentSearch>
                <ContentFinal ref={finalListRef}>
                  <FinalList onChange={changePickedItems} onCurrentListNameChange={handleCurrentListNameChange} onNewListOpening={openNewList} onSaveAndProceed={saveCurrentListAndOpenNewList}/>
                  <ButtonsWrapper>
                    <React.Suspense fallback={'...'}><SaveListButton onSave={handleListSaving} onEdit={handleListEditing}/></React.Suspense>
                    <React.Suspense fallback={'...'}><DeleteListButton onClick={handleListDeleting}/></React.Suspense>
                    <React.Suspense fallback={'...'}><PrintListButton/></React.Suspense>
                  </ButtonsWrapper>
                </ContentFinal>
              </MainContentDiv>
              <Footer/>
          </Content>
        </AppContentWrapper>
        {wasCurrentListModified && idOfListBeingCurrentlyModified && (
          <ModalWarning onConfirmWithoutSaving={openSavedList} onSaveAndConfirm={saveCurrentListAndOpenSavedList} onCloseModalWarning={() => dispatch(setIdOfCurrentlyChangedList(null))} textSave={'Save current list before opening a new one'} textDoNotSave={'Do not save list before opening a new one'} textMain={'Opening selected list'}/>
        )}
        </>
    )
}

export default MainContent