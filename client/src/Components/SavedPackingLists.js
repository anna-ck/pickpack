import React, { useContext, useState }  from 'react';
//import CurrentUserContext from '../Contexts/CurrentUserContext';
import styled from 'styled-components';
import { AppSalmon } from '../theme/Colors';
import {useDispatch, useSelector} from 'react-redux'
import { setUser, setIdOfCurrentlyChangedList, setPickedItems, setCurrentList, setUserBar } from '../actions';
import {getTheme, getPopupState, getUser, isCurrentListModified, getCurrentList, isUserBarVisible, getPickedItems, getIdOfCurrentlyChangedList} from '../reducers';

const Button = styled.button`
width: 100%;
padding: 0.5rem 1rem;
background-color: ${({ theme }) => theme.searchInput};
border: 2px solid grey;
border-radius: 5px;
color: ${({ theme }) => theme.txt};
&:hover {
    background-color: ${({ theme }) => theme.userHover};
    border: 2px solid ${AppSalmon};
}
`;

const SavedList = styled.div`
padding: 0.2rem;
margin: 0 auto;
width: 90%
`;

const SavedListsWrapper = styled.div`
width: 11rem;
text-align: left;
padding-top: 1rem;
z-index: 90;
overflow: auto;
`;

const Text = styled.h1`
text-align: center;
padding: 0.5rem;
font-size: 1rem;
`;




function SavedLists ({savedLists }) {

    const dispatch = useDispatch()
    const currentUser = useSelector(getUser)
    const pickedItems = useSelector(getPickedItems)
    const currentList = useSelector(getCurrentList)
    const wasCurrentListModified = useSelector(isCurrentListModified)
    const isUserBarActive = useSelector(isUserBarVisible)
    const idOfListBeingCurrentlyModified = useSelector(getIdOfCurrentlyChangedList)

    const changeCurrentList = (e) => {
        const listId = e.currentTarget.value
        if (listId !== currentList.id) {
          if (wasCurrentListModified) {
            dispatch(setIdOfCurrentlyChangedList(listId))
          }
          else {
            const savedLists = currentUser.savedLists
            const listToReturn = savedLists.find(list => list.id === listId)
            dispatch(setPickedItems(listToReturn.items))
            dispatch(setCurrentList({listName: listToReturn.listName, id: listToReturn.id}))
            //setCurrentList({listName: listToReturn.listName, id: listToReturn.id})
            //sessionStorage.setItem("pickedItems", JSON.stringify(listToReturn.items))
            //sessionStorage.setItem("currentList", JSON.stringify({listName: listToReturn.listName, id: listToReturn.id}))
            dispatch(setUserBar(false))
          }
        }
      }

    return (
        <>
        <Text >Your saved lists:</Text>
        {currentUser.savedLists.map((list, i) => {
            return (
                <SavedList key={'list_' + i}>
                    <Button onClick={(e) => changeCurrentList(e)} value={list.id}>{list.listName}</Button>
                </SavedList>
            )
        })}
        </>
    )
}

function SavedPackingLists () {

    //const {currentUser} = useContext(CurrentUserContext);
    const currentUser = useSelector(getUser)

    return (
        <SavedListsWrapper>
        {currentUser.savedLists.length >= 1 ? <SavedLists /> : <Text >You have no saved lists yet</Text>}
        </SavedListsWrapper>
    )
}

export default SavedPackingLists