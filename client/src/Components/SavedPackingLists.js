import React, { useState, useEffect, useRef }  from 'react';
//import User from '../../../models/usermodel';

const List = (props) => {
    return (
    props.savedLists.map((list, i) => {
        return (
            <div>
                <button key={'list_' + i} onClick={(e) => props.onListChoice(e)} value={list.listName}>{list.listName}</button>
            </div>
        )
    })
    )
}

function SavedPackingLists (props) {

return props.currentUser.savedLists ? <List savedLists={props.currentUser.savedLists} onListChoice={props.onListChoice}/> : null
}

export default SavedPackingLists