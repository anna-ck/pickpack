import React, { useState, useEffect, useContext } from 'react';
import ItemFinal from './ItemFinal';
import OpenNewListButton from './OpenNewListButton';
import ModalWarning from './ModalWarning'
import styled from 'styled-components';
import { AppSalmon } from '../theme/Colors';
import CurrentListContext from '../Contexts/CurrentListContext'
import CurrentUserContext from '../Contexts/CurrentUserContext';

const FinalListWrapper = styled.div`
  @media (max-width: 690px) {
   margin: 0 auto;
}
`;

const Header = styled.div`
    display:flex;
    flex-direction: column;
    width: calc(100% - 4px);
    height: 4.4rem;
    color: white;
    font-size: 1.6rem;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding:0.2rem 0rem;
    margin:0rem;
    background-color: ${({ theme }) => theme.headerFinal};
    border: 2px solid ${({ theme }) => theme.headerFinal};
    border-radius:2px;

    @media print {
      height: auto;
   }
`;

const List = styled.div`
    background: repeating-linear-gradient( ${({ theme }) => theme.menu}, ${({ theme }) => theme.menu} 34px, ${({ theme }) => theme.results} 34px, ${({ theme }) => theme.results} 35px); 
    height: ${({ currentUser }) => (currentUser ? '432px' : '452px')};
    width: 100%;
    border: 1px solid inherit;
    border-radius:2px;
    overflow: scroll;
    border-collapse: collapse;
    margin:0rem;
`;

const Tip= styled.p`
    font-size: 0.85rem;
    text-align: center;
    padding: 0.5rem 0.3rem 0rem 0.3rem;

    @media (max-width: 690px) {
      font-size: 0.7rem
  }

    @media print {
      display: none;
      visibility:hidden
   }
`;

const Input = styled.input`
    background-color: ${({ theme }) => theme.headerFinal};
    width: 11rem;
    border:none;
    text-align: center;
    font-size: 1.3rem;
    font-family: 'Rowdies', cursive;
    color: white;
    padding: 0.2rem 0rem
`;

const Row = styled.table`
    width: 100%;
`;

function FinalList (props, ref) {
  const [pickedItems, setPickedItems] = useState(props.pickedItems) || [];
  const {currentList} = useContext(CurrentListContext);
  const [wasCurrentListModified, setWasCurrentListModified] = useState(props.wasCurrentListModified)
  const [listToBeSaved, setListToBeSaved] = useState(false)

  const {currentUser} = useContext(CurrentUserContext);

  useEffect(() => {
    setPickedItems(props.pickedItems);
  }, [setPickedItems, props.pickedItems]);

  useEffect(() => {setWasCurrentListModified(props.wasCurrentListModified);}, [props.wasCurrentListModified]);

  const handleListNameChange = (e) => {
    setListToBeSaved(false)
    props.onCurrentListNameChange(e.target.value)
  }

  const handleItemModification = () => {
    setListToBeSaved(false)
    props.onCurrentListModification()
  }

  const handleListContentChange = (item) => {
    props.onChange(item)
  }

  const openNewListWithoutSavingCurrent = () => {
    setListToBeSaved(false)
    setWasCurrentListModified(false)
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
    setWasCurrentListModified(false)
    props.onSaveAndProceed()
  }

  return (
    <FinalListWrapper>
                {currentUser ? <OpenNewListButton onClick={handleListSaving}>Create new list</OpenNewListButton> : null }
      <Header>
          <Input value={currentList.listName} placeholder='Add list name' maxLength='12' onChange={handleListNameChange}/>
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

export default React.forwardRef(FinalList);