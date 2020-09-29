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
import AuthenticationApi from '../api/fetchAuthentication';
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


function AppContent() {
    const [theme, setTheme] = useState('light');
    const [pickedItems, setPickedItems] =  useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [currentList, setCurrentList] = useState('');
    const [isActive, setIsActive] = useState(true);

    const menuRef = useRef(0);
    const resultsRef = useRef(0);
    
    useEffect (() => {
      const fetchData = async () => {
        const result = await PickedItemsApi.getAllPickedItems()
        setPickedItems(result)
      };
      fetchData();
    }, []);

    const changeNumberInput = (item) => {
      if (item.number !== '0') {
        const indexOfItemToUpdate = pickedItems.findIndex((picked) => picked.name === item.name);
        if (indexOfItemToUpdate > -1) {
            PickedItemsApi.updateItem(item)
            .then((updatedItem) => {
            if (updatedItem.number !== 0) {
              let newPickedItems = [...pickedItems];
              let item = {...newPickedItems[indexOfItemToUpdate]}
              item.number = updatedItem.number
              newPickedItems[indexOfItemToUpdate] = item;
              setPickedItems(newPickedItems)
            }
            else {
              setPickedItems([...pickedItems.filter((picked => picked.name !== item.name))])
              PickedItemsApi.deleteItem(item)
            }
          })
        }
        else {
          item.id = uuidv4()
          PickedItemsApi.pickItem(item)
          .then((pickedItem) => {
          setPickedItems([...pickedItems, pickedItem])
          })
        }
      }
      else {
        setPickedItems([...pickedItems.filter((picked => picked.name !== item.name))])
        PickedItemsApi.deleteItem(item)
      }
    };

    const search = (listName) => {
        const result = itemLists.searchList(listName);
        setSearchResults(result);
        setCurrentList(listName);
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

    return (
<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>  
<GlobalStyle />
<Header/>
<ToggleButton onClick={toggleTheme}/>
<Content>
  <ContentLeft id='toHide'>
    <ContentLeftTop>
      <SearchInput pickedItems={pickedItems} onAdd={changeNumberInput}/>
    </ContentLeftTop>
    <BurgerIcon onClick={openBurger} burgerIsActive={isActive}></BurgerIcon>
    <ContentLeftBottom>
      <Menu ref={menuRef} currentList={currentList} handleChoice={search} />
      <Results ref={resultsRef} currentList={currentList} searchResults={searchResults} pickedItems={pickedItems} onCheck={changeNumberInput} />
    </ContentLeftBottom>
  </ContentLeft>
  <ContentRight>
    <FinalList pickedItems={pickedItems} onChange={changeNumberInput}/>
    <PrintButton onClick={window.print}>print list</PrintButton>
  </ContentRight>
</Content> 
<Footer/>
</ThemeProvider>
    )}

export default AppContent