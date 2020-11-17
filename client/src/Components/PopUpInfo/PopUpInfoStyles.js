import styled from 'styled-components';
import { ModalBlue} from '../../theme/Colors';

export const PopUpBackground= styled.div`
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

export const PopUpContent= styled.div`
    background-color: white;
    border: 6px solid ${ModalBlue};
    border-radius: 7px;
    padding: 1rem;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 1000px) {
      width: 70%;
    }
`;

export const Text= styled.h1`
    text-align: center;
    font-size: 1rem;
    width: 70%;
    margin: 0 auto;
    padding: 2.5rem 2rem 1rem 2rem;
    line-height: 1.2rem;

    @media (max-width: 1000px) {
      font-size: 0.8rem;
    }
`;

export const Button = styled.button`
    background-color: white;
    font-size: 1rem;
    border: 2px solid grey;
    border-radius: 4px;
    width: 10rem;
    height: 3rem;
    margin: 0.5rem;
    padding: 0.5rem;

    &:hover {
      background-color: ${ModalBlue};
      color: white;
    }

    @media (max-width: 1050px) {
      font-size: 0.75rem;
      width: 8rem;
      height: 3.5rem;
    }
`;