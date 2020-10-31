import React, { useState} from 'react';
import styled from 'styled-components';
import { AppBlue } from '../theme/Colors';
import {useDispatch, useSelector} from 'react-redux'
import { setUser, setPickedItems } from '../actions';
import {getTheme, getPopupState, getUser, getPickedItems} from '../reducers';

const ItemWrapper = styled.div`
    padding: 0.3rem
`;

const Item = styled.label`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    text-align: center;
    align-items: center;
    width: 90%;
    margin: 0.2rem auto;
    font-size: 1rem;

    @media (max-width: 760px) {
        font-size: 0.9rem;
    }
`;

const Name = styled.p`
    text-align: left;
    margin-left: 2rem;
    padding: 0.5rem 1rem;
    width: 70%;

    @media (max-width: 600px) {
        margin-left: 1rem;
    }
`;

const NumberInput = styled.input`
    max-width:2.5rem;
    height:1.7rem;
    background-color: white;
    border: 0.1rem solid ${AppBlue};
    margin-right: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

    @media (max-width: 600px) {
        max-width: 2.3rem;
        margin-right: 1rem; 
    }
`;

function ItemResult (props) {
    //const [pickedItems, setPickedItems] = useState(props.pickedItems);
    //React.useEffect(() => {setPickedItems(pickedItems);}, [pickedItems]);
    const pickedItems = useSelector(getPickedItems)
    const handleChange= (e) => {
        const name = e.target.parentElement.children[0].textContent;
        const number = e.target.parentElement.children[1].value;
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
                <NumberInput type='number' min={0} max={100} value={handleValue()} onChange={handleChange}/>
            </Item>
        </ItemWrapper>
    )
}

export default ItemResult;