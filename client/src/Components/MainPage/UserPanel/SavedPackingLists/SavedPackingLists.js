import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { setIdOfCurrentlyChangedList, setPickedItems, setCurrentList, setUserBar } from '../../../../actions';
import { getUser, isCurrentListModified, getCurrentList, isUserBarVisible, getPickedItems, getIdOfCurrentlyChangedList} from '../../../../reducers';
import {Button, SavedList, SavedListsWrapper, Text} from './SavedPackingListsStyles';

function SavedLists () {

    const dispatch = useDispatch()
    const currentUser = useSelector(getUser)
    const currentList = useSelector(getCurrentList)
    const wasCurrentListModified = useSelector(isCurrentListModified)

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

    const currentUser = useSelector(getUser)

    return (
        <SavedListsWrapper>
            {currentUser.savedLists.length >= 1 ? <SavedLists /> : <Text >You have no saved lists yet</Text>}
        </SavedListsWrapper>
    )
}

export default SavedPackingLists