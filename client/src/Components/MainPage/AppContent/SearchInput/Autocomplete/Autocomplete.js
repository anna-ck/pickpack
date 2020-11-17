import React, { useState, useEffect } from 'react';

import {AutocompleteDiv, AutocompleteInput, Input, AutocompleteList, AutocompleteRow} from './AutocompleteStyles';

function Autocomplete (props) {
  const [propositions, setPropositions]= useState([]);
  const [userInput, setUserInput] = useState(props.value)

  useEffect(() => {setUserInput(props.value);}, [props]);

  const handleChange = (e) => {
    const options = props.items;
    const input = e.target.value;
    const proposed = options.filter(
      (option) =>
          option.toLowerCase().startsWith(input.toLowerCase()) === true
    );
    setPropositions(proposed)
    setUserInput(e.target.value)
    props.onChange(e.target.value)
  }
  
  const handleClick = (e) => {
    setPropositions([])
    setUserInput(e.target.innerText)
    props.onChange(e.target.innerText)
    }

  const autocomplete = () => {
    if (userInput) {
      if (propositions.length > 0) {
        return (
          <AutocompleteList>
            {propositions.map((option) => {
              return (
                <AutocompleteRow key={option} onClick={handleClick}>
                  {option}
                </AutocompleteRow>
              )
            })}
          </AutocompleteList>
        )
      }
    }
  }

  return (
    <AutocompleteDiv>
      <AutocompleteInput>
          <Input
              type="text"
              maxLength='12'
              onChange={handleChange}
              value={userInput}
              placeholder='Enter item directly to your packing list'
          />
      </AutocompleteInput>
      {autocomplete()}
    </AutocompleteDiv>
  );
}
  
export default Autocomplete;