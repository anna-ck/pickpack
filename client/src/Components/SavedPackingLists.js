import React, { useContext, useState }  from 'react';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import styled from 'styled-components';
import { AppSalmon } from '../theme/Colors';

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




const SavedLists = ({savedLists, onListChoice }) => {
    return (
        <>
        <Text >Your saved lists:</Text>
        {savedLists.map((list, i) => {
            return (
                <SavedList key={'list_' + i}>
                    <Button onClick={(e) => onListChoice(e)} value={list.id}>{list.listName}</Button>
                </SavedList>
            )
        })}
        </>
    )
}

function SavedPackingLists (props) {

    const {currentUser} = useContext(CurrentUserContext);

    return (
        <SavedListsWrapper>
        {currentUser.savedLists.length >= 1 ? <SavedLists savedLists={currentUser.savedLists} onListChoice={props.onListChoice}/> : <Text >You have no saved lists yet</Text>}
        </SavedListsWrapper>
    )
}

export default SavedPackingLists