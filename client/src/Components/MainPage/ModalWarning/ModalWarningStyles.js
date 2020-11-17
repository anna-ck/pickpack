import styled from 'styled-components';
import { ModalBlue } from '../../../theme/Colors';

export const ModalBackground= styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.2);
    z-index: 50;
`;

export const ModalContent= styled.div`
    background-color: white;
    border: 6px solid ${ModalBlue};
    border-radius: 7px;
    padding: 1rem;
    width: 40%;

    @media (max-width: 1000px) {
      width: 70%;
    }
`;

export const ButtonX = styled.button`
    background-color: inherit;
    font-size: 1.5rem;
    border: none;
    width: 3rem;
    margin: 0 auto;
    float: right;
    padding: 0rem 0rem 0.5rem 0.5rem;

    &:hover {
      color: red;
      font-weight: 900
    }
`;

export const Text= styled.h1`
    text-align: center;
    font-size: 0.9rem;
    width: 70%;
    margin: 0 auto;
    padding: 2.5rem 2rem 1rem 2rem;
    line-height: 1.2rem;

    @media (max-width: 1000px) {
      font-size: 0.8rem;
    }
`;

export const Buttons= styled.div`
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    @media (max-width: 950px) {
      width: 90%
    }
`;

export const Button = styled.button`
    color: ${({ warning }) => (warning ? 'tomato' : 'seagreen')};
    background-color: white;
    font-size: 0.8rem;
    border: 1px solid ${ModalBlue};
    border-radius: 4px;
    width: 10rem;
    height: 3rem;
    margin: 0.5rem;
    padding: 0.5rem;

    &:hover {
      opacity: 0.9;
      background-color: gainsboro;
    }
    
    @media (max-width: 1050px) {
      font-size: 0.75rem;
      width: 8rem;
      height: 3.5rem;
    }
`;