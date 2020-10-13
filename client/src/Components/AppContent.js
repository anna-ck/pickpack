import React, { useState, useEffect, useRef, useContext }  from 'react';
import { useHistory } from "react-router-dom";

import {ThemeProvider} from "styled-components";
import GlobalStyle from '../theme/globalStyles';
import { lightTheme, darkTheme } from "../theme/Themes";

import Header from '../Components/Header';
import ToggleButton from '../Components/ToggleButton';
import SearchInput from '../Components/SearchInput';
import BurgerIcon from '../Components/BurgerIcon';
import Menu from '../Components/Menu';
import Results from './Results';
import FinalList from '../Components/FinalList';
import Footer from '../Components/Footer';
import UserGreeting from './UserGreeting';

import { itemLists } from '../Utilities/Helper'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import CurrentUserContext from '../Contexts/CurrentUserContext'
import CurrentListContext from '../Contexts/CurrentListContext';

import handleSearchResultsApi from '../api/fetchSearchResults'

const SavedPackingLists = React.lazy(() => import('./SavedPackingLists'))
const SaveListButton = React.lazy(() => import('./SaveListButton'))
const DeleteListButton = React.lazy(() => import('./DeleteListButton'))

const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    margin: 2rem auto 1rem auto;
    width: 100%;

    @media (max-width: 1090px) {
        flex-direction: column;
    }
`;

const ContentLeft = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 1.5rem;
    padding-right: 1.5rem;

    @media (max-width: 1090px) {
        width: 60%;
        margin: 0 auto;
        padding:0;
        padding-bottom: 2.5rem;
    }

    @media (max-width: 910px) {
      width: 80%;
    }

    @media (max-width: 690px) {
      width: 95%;
    }

    @media print {
      display: none;
      visibility:hidden
   }
`;

const ContentLeftTop = styled.div`
    max-width: 100%;
    padding:0rem;
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
    padding: 0rem 0rem 0rem 1.5rem;
    margin-right: 1.5rem;

    @media (max-width: 1090px) {
        width: 60%;
        margin: 0 auto;
        text-align: center;
        padding: 0rem
    }

    @media (max-width: 910px) {
      width: 80%;
    }

    @media (max-width: 690px) {
      width: 95%;
      margin: 1rem auto;
      padding: 0rem;
    }
`;

const PrintButton = styled.button`
    float: right;
    margin: 0 auto;
    font-size: 0.8rem;
    padding:0.6rem;
    background-color: ${({ theme }) => theme.span};
    border: 2px solid rgb(216, 96, 83);
    border-radius: 14px;
    text-transform: uppercase;
    color:white;
    
    &:hover {
      background-color: rgb(248, 150, 139);
    }

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

    const menuRef = useRef(0);
    const resultsRef = useRef(0);

    const history = useHistory();

    useEffect (() => {
      const pickedItemsFromStorage = JSON.parse(localStorage.getItem('pickedItems')) || []
      const currentListFromStorage = JSON.parse(localStorage.getItem('currentList')) || {listName: '', id: ''}
      setPickedItems(pickedItemsFromStorage || [])
      setCurrentList(currentListFromStorage || {listName: '', id: ''})
    }, [currentUser, setPickedItems])


    const changeInputItem = (item) => {
      if (item.number !== '0') {
        const indexOfItemToUpdate = pickedItems.findIndex((picked) => picked.name === item.name);
        if (indexOfItemToUpdate > -1) {
            if (item.number !== 0) {
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
              setPickedItems(newPickedItems)
              localStorage.setItem("pickedItems", JSON.stringify(newPickedItems))
            }
        }
        else {
          item.id = uuidv4()
          item.description = ''
          const newPickedItems = [...pickedItems, item]
          setPickedItems(newPickedItems)
          localStorage.setItem("pickedItems", JSON.stringify(newPickedItems))
          setWasCurrentListModified(true)
        }
      }
      else {
        const newPickedItems = [...pickedItems.filter((picked => picked.name !== item.name))]
        setPickedItems(newPickedItems)
        localStorage.setItem("pickedItems", JSON.stringify(newPickedItems))
      }
    }

    const search = (listName) => {
       handleSearchResultsApi.getItemsByListName(listName)
       .then((result) => {
       const items = result[0].items
        setSearchResults(items);
        setCurrentSearchList(listName);
        if (window.innerWidth < 690) {
          openBurger()
        }
       }
       )
    };

    const toggleTheme = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light')
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
      const savedLists = currentUser.savedLists
      const listToReturn = savedLists.find(list => list.id === listId)
      setPickedItems(listToReturn.items)
      setCurrentList({listName: listToReturn.listName, id: listToReturn.id})
      localStorage.setItem("pickedItems", JSON.stringify(listToReturn.items))
      localStorage.setItem("currentList", JSON.stringify({listName: listToReturn.listName, id: listToReturn.id}))
      setWasCurrentListModified(false)
    }

    const handleNewListOpening = () => {
      setPickedItems([])
      setCurrentList({listName: '', id: ''})
      setWasCurrentListModified(false)
    }

    const handleSaveAndProceed = async () => {
      if (currentList.id) {
        editSavedList()
        setCurrentList({listName: '', id: ''})
        localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
        localStorage.removeItem("pickedItems");
      }
      else {
        handleListSaving()
        setCurrentList({listName: '', id: ''})
        localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
        localStorage.removeItem("pickedItems");
      }
      setWasCurrentListModified(false)
    }

    const handleListDeleting = () => {
      props.onDelete(currentList)
      setWasCurrentListModified(false)
      setCurrentList({listName: '', id: ''})
      localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
      localStorage.removeItem("pickedItems");
    }

    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}> 
        <CurrentListContext.Provider value={{currentList:currentList, onCurrentListChange: setCurrentList}} >
        <GlobalStyle />
          <NavBar>
            <UserGreeting onAuthChange={handleAuthChange}/>
            {currentUser ? <React.Suspense fallback={'... loading saved lists'}><SavedPackingLists onListChoice={changeCurrentList}/></React.Suspense> : null}
            <Header/>
            <ToggleButton onClick={toggleTheme}/>
          </NavBar>
          <Content>
            <ContentLeft>
              <ContentLeftTop>
                <SearchInput pickedItems={pickedItems} onAdd={changeInputItem}/>
              </ContentLeftTop>
              <BurgerIcon onClick={openBurger} burgerIsActive={isActive}></BurgerIcon>
              <ContentLeftBottom>
                <Menu ref={menuRef} currentSearchList={currentSearchList} handleChoice={search} />
                <Results ref={resultsRef} currentSearchList={currentSearchList} searchResults={searchResults} pickedItems={pickedItems} onCheck={changeInputItem} />
              </ContentLeftBottom>
            </ContentLeft>
            <ContentRight>
              <FinalList pickedItems={pickedItems} onChange={changeInputItem} onCurrentListNameChange={handleCurrentListNameChange} onNewListOpening={handleNewListOpening} onSaveAndProceed={handleSaveAndProceed} wasCurrentListModified={wasCurrentListModified} onCurrentListModification={() => setWasCurrentListModified(true)}/>
              <PrintButton onClick={window.print}>print list</PrintButton>
              <React.Suspense fallback={'...'}><SaveListButton onClick={handleListSaving} onEdit={editSavedList}/></React.Suspense>
              <React.Suspense fallback={'...'}><DeleteListButton onClick={handleListDeleting}/></React.Suspense>
            </ContentRight>
          </Content> 
          <Footer/>
        </CurrentListContext.Provider>
      </ThemeProvider>
    )
}

export default AppContent