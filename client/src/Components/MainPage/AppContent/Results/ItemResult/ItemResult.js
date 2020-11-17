import React from 'react';
import {useSelector} from 'react-redux'
import {getPickedItems} from '../../../../../reducers';

import {Item, ItemWrapper, Name, NumberInput} from './ItemResultStyles'

function ItemResult (props) {
    const pickedItems = useSelector(getPickedItems)

    const handleChange= (e) => {
        const name = e.target.parentElement.children[0].textContent;
        let number = e.target.parentElement.children[1].value;
        if (number.length >= 3) {
            number.slice(0, 2)
            return number
        }
        const item = {}
        item.name = name;
        item.number = number;
        let itemToFind = pickedItems.find((picked => picked.name === props.item))
        if (itemToFind) {
            item.id = itemToFind.id
        }
        if (number >= 0) {
            props.onCheck(item);
        }
    }
    
    const handleValue = (e) => {
        let itemToFind = pickedItems.find((picked => picked.name === props.item))
        if (itemToFind) {
            return itemToFind.number
        }
        else {
            return 0
        }
    }

    return (
        <ItemWrapper>
            <Item>
                <Name>{props.item}</Name>
                <NumberInput type='number' min='0' max='99' value={handleValue()} onChange={handleChange}/>
            </Item>
        </ItemWrapper>
    )
}

export default ItemResult;