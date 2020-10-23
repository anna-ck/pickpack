import React, { useState, useEffect, useRef, useContext }  from 'react';
import { useHistory } from "react-router-dom";

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

import { itemLists } from '../Utilities/Helper'
import styled from 'styled-components';
import { AppSalmon, AppBlue } from '../theme/Colors';
import { v4 as uuidv4 } from 'uuid';

import CurrentUserContext from '../Contexts/CurrentUserContext'
import CurrentListContext from '../Contexts/CurrentListContext';

import handleSearchResultsApi from '../api/fetchSearchResults';

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
    justify-content: center;
    align-items: center;
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

const ContentLeft = styled.div`
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

const ContentLeftTop = styled.div`
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

const ContentLeftBottom = styled.div`
    max-width: 100%;
    display: inline-flex;
    flex-direction: row;
    align-content: space-between;
`;

const ContentRight = styled.div`
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

    const [theme, setTheme] = useState('light');
    const [pickedItems, setPickedItems] =  useState([]) || [];
    const [searchResults, setSearchResults] = useState([]);
    const [currentSearchList, setCurrentSearchList] = useState('');
    const [isActive, setIsActive] = useState(true);
    const {currentUser} = useContext(CurrentUserContext);
    const [currentList, setCurrentList] = useState({listName: '', id: ''});
    const [wasCurrentListModified, setWasCurrentListModified] = useState(false)
    const [isUserBarActive, setUserBarActive] = useState(false)
    const [isModalWarningVisible, setModalWarningVisible] = useState(null);

    const menuRef = useRef(0);
    const resultsRef = useRef(0);
    const finalListRef = useRef();

    const history = useHistory();

    useEffect (() => {
      const pickedItemsFromStorage = JSON.parse(localStorage.getItem('pickedItems')) || []
      const currentListFromStorage = JSON.parse(localStorage.getItem('currentList')) || {listName: '', id: ''}
      setPickedItems(pickedItemsFromStorage || [])
      setCurrentList(currentListFromStorage || {listName: '', id: ''})
    }, [currentUser, setPickedItems]);

    /*
    useEffect (() => {
      if(currentUser && window.innerWidth <= 760 && !isUserBarActive) {
        finalListRef.current.scrollIntoView()
        setUserBarActive(false)
      }
      else {
        window.scrollTo(0,0)
        setUserBarActive(false)
      }
    }, [isUserBarActive])
    */

    const changePickedItems = (item) => {
        const indexOfItemToUpdate = pickedItems.findIndex((picked) => picked.name === item.name);
        if (indexOfItemToUpdate > -1) {
            if (item.number !== 0) {
              console.log('edit')
              let newPickedItems = [...pickedItems];
              let newItem = {...newPickedItems[indexOfItemToUpdate]}
              newItem.number = item.number
              newItem.description = item.description || ''
              newPickedItems[indexOfItemToUpdate] = newItem;
              setPickedItems(newPickedItems)
              localStorage.setItem("pickedItems", JSON.stringify(newPickedItems))
            }
            else {
              const newPickedItems = [...pickedItems.filter((picked => picked.name !== item.name))]
              console.log('delete')
              setPickedItems(newPickedItems)
              localStorage.setItem("pickedItems", JSON.stringify(newPickedItems))
            }
        }
        else {
          item.id = uuidv4()
          console.log('add')
          item.description = ''
          const newPickedItems = [...pickedItems, item]
          setPickedItems(newPickedItems)
          localStorage.setItem("pickedItems", JSON.stringify(newPickedItems))
          setWasCurrentListModified(true)
        }
    }

    const search = (listName) => {
       handleSearchResultsApi.getItemsByListName(listName)
       .then((result) => {
       const items = result[0].items
        setSearchResults(items);
        setCurrentSearchList(listName);
        if (window.innerWidth < 760) {
          openBurger()
        }
       }
       )
    };

    const openBurger = () => {
      resultsRef.current.style.display === 'none' || resultsRef.current.style.display === '' ? resultsRef.current.style.display = 'block' : resultsRef.current.style.display = 'none';
      menuRef.current.style.display === '' ||  menuRef.current.style.display === 'block' ? menuRef.current.style.display = 'none' : menuRef.current.style.display = 'block';
      setIsActive(!isActive)
    }

    const handleAuthChange = () => {
      props.onAuthChange();
      if (currentUser) {
        history.push("/");
        setUserBarActive(false)
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
        props.onSave(pickedItems, currentList)
        setWasCurrentListModified(false)
        setCurrentList({listName: name, id: id})
        localStorage.setItem("currentList", JSON.stringify({listName: name, id: id}))
      }
    }

    const editSavedList = () => {
      props.onEdit(pickedItems, currentList)
      setWasCurrentListModified(false)
    }

    const handleCurrentListNameChange = (name) => {
      setCurrentList({listName: name, id: currentList.id})
      setWasCurrentListModified(true)
      localStorage.setItem("currentList", JSON.stringify({listName: name, id: currentList.id}))
    }

    const changeCurrentList = (e) => {
      const listId = e.currentTarget.value
      if (wasCurrentListModified) {
        setModalWarningVisible(listId)
      }
      else {
        const savedLists = currentUser.savedLists
        const listToReturn = savedLists.find(list => list.id === listId)
        setPickedItems(listToReturn.items)
        setCurrentList({listName: listToReturn.listName, id: listToReturn.id})
        localStorage.setItem("pickedItems", JSON.stringify(listToReturn.items))
        localStorage.setItem("currentList", JSON.stringify({listName: listToReturn.listName, id: listToReturn.id}))
        setUserBarActive(false)
      }
    }

    const handleNewListOpening = () => {
      setPickedItems([])
      setCurrentList({listName: '', id: ''})
      localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
      localStorage.removeItem("pickedItems");
      setWasCurrentListModified(false)
    }

    const handleSaveAndCreateNew = async () => {
      if (currentList.id) {
        editSavedList()
      }
      else {
        handleListSaving()
      }
      setCurrentList({listName: '', id: ''})
      localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
      localStorage.removeItem("pickedItems");
      setWasCurrentListModified(false)
    }

    const saveCurrentAndOpenSavedListAfterWarning = async () => {
      if (currentList.id) {
        editSavedList()
      }
      else {
        handleListSaving()
      }
      const savedLists = currentUser.savedLists
      const listToReturn = savedLists.find(list => list.id === isModalWarningVisible)
      //setPickedItems(listToReturn.items)
      //setCurrentList({listName: listToReturn.listName, id: listToReturn.id})
      //localStorage.setItem("pickedItems", JSON.stringify(listToReturn.items))
      //localStorage.setItem("currentList", JSON.stringify({listName: listToReturn.listName, id: listToReturn.id}))
      setCurrentList({listName: '', id: ''})
      localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
      localStorage.removeItem("pickedItems");
      setWasCurrentListModified(false)
      setUserBarActive(false)
      setModalWarningVisible(null)
    }

    const OpenSavedListAfterWarningWithoutSavingCurrent = async () => {
      const savedLists = currentUser.savedLists
      const listToReturn = savedLists.find(list => list.id === isModalWarningVisible)
      //setPickedItems(listToReturn.items)
      //setCurrentList({listName: listToReturn.listName, id: listToReturn.id})
      //localStorage.setItem("pickedItems", JSON.stringify(listToReturn.items))
      //localStorage.setItem("currentList", JSON.stringify({listName: listToReturn.listName, id: listToReturn.id}))
      setCurrentList({listName: '', id: ''})
      localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
      localStorage.removeItem("pickedItems");
      setWasCurrentListModified(false)
      setUserBarActive(false)
      setModalWarningVisible(null)
    }

    const handleListDeleting = () => {
      props.onDelete(currentList)
      setWasCurrentListModified(false)
      setCurrentList({listName: '', id: ''})
      localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
      localStorage.removeItem("pickedItems");
    }

    const toggleUserBarState = () => {
      setUserBarActive((prevUserBsrStatus) => !prevUserBsrStatus)
    }

    return (
        <CurrentListContext.Provider value={{currentList:currentList, onCurrentListChange: setCurrentList}} >
        <ToggleUserButton isActive={!isUserBarActive} currentUser={currentUser} onClick={toggleUserBarState}><Icon className="fas fa-user-circle"></Icon>{currentUser ? ` You are logged in as ${currentUser.login}` : null}</ToggleUserButton>
        <AppContentWrapper>
          {currentUser ? 
          <UserBar currentUser={currentUser} isActive={isUserBarActive}>
            <UserPanel onAuthChange={handleAuthChange} onListChoice={changeCurrentList} onClick={toggleUserBarState}/>
          </UserBar> : 
          <StrangerGreeting onAuthChange={handleAuthChange}/>}
          <Content currentUser={currentUser} isActive={!isUserBarActive}>
              <Header/>
              <MainContent>
                <ContentLeft>
                  <ContentLeftTop>
                    <SearchInput pickedItems={pickedItems} onAdd={changePickedItems}/>
                  </ContentLeftTop>
                  <BurgerIcon onClick={openBurger} burgerIsActive={isActive}></BurgerIcon>
                  <ContentLeftBottom>
                    <Menu ref={menuRef} currentSearchList={currentSearchList} handleChoice={search} />
                    <Results ref={resultsRef} currentSearchList={currentSearchList} searchResults={searchResults} pickedItems={pickedItems} onCheck={changePickedItems} />
                  </ContentLeftBottom>
                </ContentLeft>
                <ContentRight ref={finalListRef}>
                  <FinalList pickedItems={pickedItems} onChange={changePickedItems} onCurrentListNameChange={handleCurrentListNameChange} onNewListOpening={handleNewListOpening} onSaveAndProceed={handleSaveAndCreateNew} wasCurrentListModified={wasCurrentListModified} onCurrentListModification={() => setWasCurrentListModified(true)}/>
                  <ButtonsWrapper>
                    <React.Suspense fallback={'...'}><SaveListButton onClick={handleListSaving} onEdit={editSavedList}/></React.Suspense>
                    <React.Suspense fallback={'...'}><DeleteListButton onClick={handleListDeleting}/></React.Suspense>
                    <React.Suspense fallback={'...'}><PrintListButton/></React.Suspense>
                  </ButtonsWrapper>
                </ContentRight>
              </MainContent>
              <Footer/>
          </Content>
          </AppContentWrapper>
          {wasCurrentListModified && isModalWarningVisible && (
          <ModalWarning onConfirmWithoutSaving={OpenSavedListAfterWarningWithoutSavingCurrent} onSaveAndConfirm={saveCurrentAndOpenSavedListAfterWarning} onCloseModalWarning={() => {setModalWarningVisible(null)}} textSave={'Save current list before opening a new one'} textDoNotSave={'Do not save list before opening a new one'} textMain={'Opening selected list'}/>
          )}
          </CurrentListContext.Provider>
    )
}

export default AppContent