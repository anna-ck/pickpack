import React, { useState } from 'react';
import Autocomplete from './Autocomplete'
import { itemLists } from '../Utilities/Helper';
import styled from 'styled-components'
import { AppSalmon, AppBlue } from '../theme/Colors';

const SearchContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    border-radius:3px;
`;

const Input = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height:50px;
    z-index:3
`;

const IconPlus = styled.i`
    color: ${AppBlue};
    font-size: 2.3rem;
    padding-top:0.35rem;
    margin-left: 0.5rem;

    &:hover {
        color: ${AppSalmon};
    }
`;

const TipTxt = styled.p`
    margin: 1.5rem auto 1rem auto;
    padding:0.5rem;
    background-color: ${({ theme }) => theme.tipTxtBcg};
    border: 2px solid ${({ theme }) => theme.tipTxtBcg};
    border-radius: 4px;
    font-weight: 400;
    font-size: 0.85rem;
    width: 80%;

    @media (max-width: 690px) {
        margin-bottom: 0rem;
        font-size: 0.7rem
    }

    @media (max-width: 1090px) {
        width: 80%;
    }
`;

function SearchInput (props) {
    const [value, setValue] = useState('')

    const handleValue = (item) => {
        setValue(item)
    }

    const handleAdd = () => {
        if (value.length) {
            let itemToFind = props.pickedItems.find((picked => picked.name === value))
            const item = {};
            item.name = value;
            if (itemToFind) {
                item.number = 1 + +itemToFind.number;
                item.id = itemToFind.id
            }
            else {
                item.number = 1 
            }
            props.onAdd(item)
            setValue('')
        }
    }
    
    const itemsToAutocomplete = itemLists.concatItems()
    
    return (
        <SearchContainer>
            <Input>
                <Autocomplete onChange={handleValue} items={itemsToAutocomplete} value={value}/>
                <IconPlus className="fas fa-plus" onClick={handleAdd}></IconPlus> 
            </Input>
            <TipTxt>... or click on the selected category to see our suggestions!</TipTxt>
        </SearchContainer>
    )
}

export default SearchInput;