import React, { useState, useEffect, useRef }  from 'react';
//import User from '../../../models/usermodel';
import { v4 as uuidv4 } from 'uuid';

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

return props.currentUser.savedLists ? <List savedLists={props.currentUser.savedLists} onListChoice={props.onListChoice}/> : null
}

export default SavedPackingLists