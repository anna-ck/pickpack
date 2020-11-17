import React, { useState } from 'react';
import {ItemFinal} from './ItemFinal';
import OpenNewListButton from './OpenNewListButton';
import {ModalWarning} from '../../ModalWarning'
import {useDispatch, useSelector} from 'react-redux'
import { denyListModification, confirmListModification } from '../../../../actions';
import {getUser, getPickedItems, getCurrentList, isCurrentListModified} from '../../../../reducers';
import {FinalListWrapper, Header, List, Tip, Input, Row} from './FinalListStyles'

function FinalList (props) {
  const [listToBeSaved, setListToBeSaved] = useState(false)
  const wasCurrentListModified = useSelector(isCurrentListModified)
  const dispatch = useDispatch()
  const currentList = useSelector(getCurrentList)
  const currentUser = useSelector(getUser)
  const pickedItems = useSelector(getPickedItems)

  const handleListNameChange = (e) => {
    setListToBeSaved(false)
    props.onCurrentListNameChange(e.target.value)
  }

  const handleItemModification = () => {
    setListToBeSaved(false)
    dispatch(confirmListModification())
  }

  const handleListContentChange = (item) => {
    props.onChange(item)
  }

  const openNewListWithoutSavingCurrent = () => {
    setListToBeSaved(false)
    dispatch(denyListModification())
    props.onNewListOpening()
  }

  const handleListSaving = () => {
    if (!wasCurrentListModified) {
      props.onNewListOpening()
      setListToBeSaved(false)
    }
    else {
      setListToBeSaved(true)
    }
  }

  const saveCurrentListAndOpenNew = () => {
    setListToBeSaved(false)
    dispatch(denyListModification())
    props.onSaveAndProceed()
  }

  return (
    <FinalListWrapper>
      {currentUser ? <OpenNewListButton onClick={handleListSaving}>Create new list</OpenNewListButton> : null }
      <Header>
          <Input value={currentList.listName} placeholder='Add list name' maxLength='20' onChange={handleListNameChange}/>
          <Tip>Tip: you can change the number of items and describe them</Tip>
      </Header>
      <List currentUser={currentUser}>
          {pickedItems.map((item, i) => {
              return (
                  <Row key={'item_' + i}>
                      <ItemFinal item={item} onChange={handleListContentChange} onItemModification={handleItemModification}/>
                  </Row>
              )
          })}
      </List>
      {wasCurrentListModified && listToBeSaved && (
        <ModalWarning onConfirmWithoutSaving={openNewListWithoutSavingCurrent} onSaveAndConfirm={saveCurrentListAndOpenNew} onCloseModalWarning={() => {setListToBeSaved(false)}} textSave={'Save current list before creating a new one'} textDoNotSave={'Create a new empty list without saving changes'} textMain={'Creating new list '}/>
      )}
    </FinalListWrapper>
  )
}

export default FinalList;