import styled from 'styled-components';
import { AppBlue } from '../../../../../theme/Colors';

export const ItemWrapper = styled.div`
    padding: 0.3rem
`;

export const Item = styled.label`
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

export const Name = styled.p`
    text-align: left;
    margin-left: 2rem;
    padding: 0.5rem 1rem;
    width: 70%;

    @media (max-width: 600px) {
        margin-left: 1rem;
    }
`;

export const NumberInput = styled.input`
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