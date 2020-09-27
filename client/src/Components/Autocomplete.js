import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {AppBlue, AppSalmon} from '../theme/Colors';

const AutocompleteDiv = styled.div`
    z-index: 10;
`;

const AutocompleteInput = styled.div`
    display:flex;
    align-content: center;
    justify-content: center;
`;

const Input = styled.input`
    width: 20rem;
    height:2.5rem;
    background-color: ${({ theme }) => theme.searchInput};
    color: ${({ theme }) => theme.txt};
    border: 2px solid ${AppBlue};
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 0.9rem;
    padding-left: 0.5rem;

    ::placeholder {
      color: ${({ theme }) => theme.txt};
    }

    @media (max-width: 690px) {
      width: 14rem;
      font-size: 0.7rem;
  }
`;

const AutocompleteList = styled.ul`
border: 0.5px solid ${AppSalmon};
border-top: none;`;

const AutocompleteRow = styled.li`
    font-size: 0.95rem;
    color: ${({ theme }) => theme.autoTxt};
    background-color: ${({ theme }) => theme.autocomplete2};
    padding: 0.3rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

    &:nth-of-type(odd) {
      background-color: ${({ theme }) => theme.autocomplete1};
    };

    &:hover {
      font-size: 0.99rem;
      color: ${({ theme }) => theme.hover2};
      font-weight: 550;
    }
`;

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

    /*window.addEventListener("click", function(event) {
      setPropositions([])
      setUserInput('')
    })
    */

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
        )}}}

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
  