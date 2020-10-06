import React, { useState, useEffect, useRef }  from 'react';
import AuthenticationPage from '../Components/AuthenticationPage';
import Header from '../Components/Header';
import ToggleButton from '../Components/ToggleButton'
import SearchInput from '../Components/SearchInput';
import BurgerIcon from '../Components/BurgerIcon';
import Menu from '../Components/Menu';
import Results from './Results';
import FinalList from '../Components/FinalList';
import Footer from '../Components/Footer'
import { itemLists } from '../Utilities/Helper'
import styled from 'styled-components';
import {ThemeProvider} from "styled-components";
import GlobalStyle from '../theme/globalStyles';
import { lightTheme, darkTheme } from "../theme/Themes";
import PickedItemsApi from '../api/fetchPickedItems';
import UserGreeting from './UserGreeting'
import SaveListButton from './SaveListButton'
import SavedPackingLists from './SavedPackingLists'
import { v4 as uuidv4 } from 'uuid';


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
    const [currentUser, setCurrentUser] = useState(props.currentUser)
    const [currentList, setCurrentList] = useState({listName: '', id: ''})

    const menuRef = useRef(0);
    const resultsRef = useRef(0);

    useEffect (() => {
      setCurrentUser(props.currentUser)
      const pickedItemsFromStorage = JSON.parse(localStorage.getItem('pickedItems')) || []
      const currentListFromStorage = JSON.parse(localStorage.getItem('currentList')) || {listName: '', id: ''}
      setPickedItems(pickedItemsFromStorage || [])
      setCurrentList(currentListFromStorage || {listName: '', id: ''})
    }, [props.currentUser])

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
    }
  }
  else {
    const newPickedItems = [...pickedItems.filter((picked => picked.name !== item.name))]
    setPickedItems(newPickedItems)
    localStorage.setItem("pickedItems", JSON.stringify(newPickedItems))
  }
}

    const search = (listName) => {
        const result = itemLists.searchList(listName);
        setSearchResults(result);
        setCurrentSearchList(listName);
        if (window.innerWidth < 690) {
          openBurger()
        }
    };

    const toggleTheme = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light')
    };

    const openBurger = () => {
      resultsRef.current.style.display === 'none' || resultsRef.current.style.display === '' ? resultsRef.current.style.display = 'block' : resultsRef.current.style.display = 'none';
      menuRef.current.style.display === '' ||  menuRef.current.style.display === 'block' ? menuRef.current.style.display = 'none' : menuRef.current.style.display = 'block';
      setIsActive(!isActive)
    }

    const handleListSaving = () => {
      props.onClick(pickedItems, currentList)
      setCurrentList({listName: '', id: ''})
      localStorage.setItem("currentList", JSON.stringify({listName: '', id: ''}))
    }

    const editSavedList = () => {
      console.log(pickedItems)
      props.onEdit(pickedItems, currentList)
    }

    const handleCurrentListNameChange = (name) => {
      setCurrentList({listName: name, id: currentList.id})
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
    }

    const handleNewListOpening = () => {
      setPickedItems([])
      setCurrentList({listName: '', id: ''})
    }

    return (
<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>  
<GlobalStyle />
<UserGreeting currentUser={currentUser} onAuthChange={props.onAuthChange}/>
{currentUser ? <SavedPackingLists currentUser={currentUser} onListChoice={changeCurrentList}/> : null}
{currentUser ?  <button onClick={handleNewListOpening}>Open new list</button> : null}
<Header/>
<ToggleButton onClick={toggleTheme}/>
<Content>
  <ContentLeft id='toHide'>
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
    <FinalList pickedItems={pickedItems} currentList={currentList} onChange={changeInputItem} onCurrentListNameChange={handleCurrentListNameChange} onNewListOpening={handleNewListOpening}/>
    <PrintButton onClick={window.print}>print list</PrintButton>
    <SaveListButton onClick={handleListSaving} onEdit={editSavedList} currentUser={currentUser} currentList={currentList}/>
  </ContentRight>
</Content> 
<Footer/>
</ThemeProvider>
    )}

export default AppContent