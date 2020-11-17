import React, { useEffect, useState } from 'react';
import {Autocomplete} from './Autocomplete'
import handleSearchResultsApi from '../../../../api/fetchSearchResults'
import {useSelector} from 'react-redux'
import {getPickedItems} from '../../../../reducers';
import {SearchContainer, Input, IconPlus, TipTxt} from './SearchInputStyles'

function SearchInput (props) {
    const [value, setValue] = useState('')
    const [itemsToAutocomplete, setItemsToAutocomplete] = useState([])

    const pickedItems = useSelector(getPickedItems)

    const handleValue = (item) => {
        setValue(item)
    }

    const handleAdd = () => {
        if (value.length) {
            let itemToFind = pickedItems.find((picked => picked.name === value))
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
    
    useEffect(() => {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          };
          handleSearchResultsApi.getAllItems()
          .then((response) => {
              const results = response[0].items
              const uniqResults = results.filter(onlyUnique)
              setItemsToAutocomplete(uniqResults)
          })
    }, [])
    
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