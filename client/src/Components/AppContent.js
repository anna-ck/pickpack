import React, { useRef }  from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import Header from '../Components/Header';
import SearchInput from '../Components/SearchInput';
import BurgerIcon from '../Components/BurgerIcon';
import Menu from '../Components/Menu';
import Results from './Results';
import FinalList from '../Components/FinalList';
import Footer from '../Components/Footer';
import UserPanel from './UserPanel';
import StrangerGreeting from './StrangerGreeting';
import ModalWarning from './ModalWarning'

import styled from 'styled-components';
import { AppSalmon, AppBlue } from '../theme/Colors';
import { v4 as uuidv4 } from 'uuid';

import handleSearchResultsApi from '../api/fetchSearchResults';

import { setPickedItems, addPickedItem, deletePickedItem, updatePickedItem, setSearchResults, setCurrentSearchList, setBurger, setCurrentList, confirmListModification, denyListModification, setUserBar, setIdOfCurrentlyChangedList, setInitialState } from '../actions';
import {getUser, getPickedItems, getCurrentList, isCurrentListModified, isUserBarVisible, getIdOfCurrentlyChangedList} from '../reducers';

const SaveListButton = React.lazy(() => import('./SaveListButton'));
const DeleteListButton = React.lazy(() => import('./DeleteListButton'));
const PrintListButton = React.lazy(() => import('./PrintListButton'));

const AppContentWrapper= styled.div`
  display: flex;
  margin: 0 auto;
  overflow: auto;
`;

const ToggleUserButton = styled.button`
  display: none;
  padding: 0.5rem 0.8rem;
  margin: 1rem;
  font-size: 0.9rem;
  line-height: 1.5rem;
  background-color: white;
  border: 2px solid ${AppBlue};;
  border-radius: 50px;

  &:hover {
    border-color: ${AppSalmon};
  }

  @media (max-width: 760px) {
    display: ${({ isActive, currentUser }) => (isActive && currentUser ? 'block' : 'none')};
  };

  @media print {
    display: none;
    visibility:hidden
 }
`;

const Icon = styled.i`
  font-size: 1.5rem;
  padding: 0rem 0.2rem;
`;

const UserBar = styled.div`
  position: fixed;
  width: ${({ currentUser }) => (currentUser ? '13rem' : '0rem')};
  background-color:  ${({ theme }) => theme.userPanel};
  flex-direction: column;
  justify-content: left;
  align-content: center;
  height: 100vh;
  overflow: auto;

  @media (max-width: 760px) {
    display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
    width: 100%;
    height: 100vh;
    position: sticky;
    left: 0;
    top: 0;
  };

  @media print {
    display: none;
    visibility:hidden
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  margin-left: ${({ currentUser }) => (currentUser ? '13rem' : '0rem')};

  @media (max-width: 760px) {
    margin: 0;
    display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  }
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 1290px) {
    flex-direction: column;
  }
`;

const ContentSearch = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  margin: 0rem 0.75rem 0rem 1.5rem;

  @media (max-width: 1290px) {
    width: 70%;
    margin: 0 auto;
    padding:0;
    padding-bottom: 2.5rem;
  }

  @media (max-width: 1090px) {
    width: 70%;
  }

  @media (max-width: 950px) {
    width: 85%;
  }

  @media (max-width: 820px) {
    width: 95%;
  }

  @media print {
    display: none;
    visibility:hidden
  }
`;

const ContentSearchInput = styled.div`
  max-width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-content: center;
  z-index:2;
  padding-bottom:0.5rem;

  @media (max-width: 690px) {
    padding-bottom: 0rem;
  }

  @media (max-width: 1090px) {
      width:100%;
      display:inline-flex;
  }
`;

const ContentSearchResults = styled.div`
  max-width: 100%;
  display: inline-flex;
  flex-direction: row;
  align-content: space-between;
`;

const ContentFinal = styled.div`
  width: 50%;
  padding: 0rem;
  margin: 0rem 1.5rem 0rem 0.75rem;

  @media (max-width: 1290px) {
    width: 70%;
      margin: 0 auto;
      text-align: center;
      padding: 0rem
  }

  @media (max-width: 1090px) {
    width: 70%;
  }

  @media (max-width: 950px) {
    width: 85%;
  }

  @media (max-width: 820px) {
    width: 95%;
  }

  @media (max-width: 760px) {
    width: 85%;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.5rem;

  @media print {
    display: none;
    visibility:hidden
  }
`;

function AppContent(props) {

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
              <MainContent>
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
              </MainContent>
              <Footer/>
          </Content>
        </AppContentWrapper>
        {wasCurrentListModified && idOfListBeingCurrentlyModified && (
          <ModalWarning onConfirmWithoutSaving={openSavedList} onSaveAndConfirm={saveCurrentListAndOpenSavedList} onCloseModalWarning={() => dispatch(setIdOfCurrentlyChangedList(null))} textSave={'Save current list before opening a new one'} textDoNotSave={'Do not save list before opening a new one'} textMain={'Opening selected list'}/>
        )}
        </>
    )
}

export default AppContent