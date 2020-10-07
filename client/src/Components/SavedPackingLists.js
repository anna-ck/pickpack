import React, { useContext }  from 'react';
import CurrentUserContext from '../Contexts/CurrentUserContext'

const List = (props) => {
    return (
        props.savedLists.map((list, i) => {
            return (
                <div key={'list_' + i}>
                    <button onClick={(e) => props.onListChoice(e)} value={list.id}>{list.listName}</button>
                </div>
            )
        })
    )
}

function SavedPackingLists (props) {

    const {currentUser} = useContext(CurrentUserContext);

    return currentUser.savedLists ? <List savedLists={currentUser.savedLists} onListChoice={props.onListChoice}/> : null
}

export default SavedPackingLists