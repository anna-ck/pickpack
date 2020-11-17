import styled from 'styled-components';
import {AppBlue, AppSalmon} from '../../../../../theme/Colors';

export const AutocompleteDiv = styled.div`
    z-index: 10;
`;

export const AutocompleteInput = styled.div`
    display:flex;
    align-content: center;
    justify-content: center;
`;

export const Input = styled.input`
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

export const AutocompleteList = styled.ul`
    border: 0.5px solid ${AppSalmon};
    border-top: none;`
;

export const AutocompleteRow = styled.li`
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