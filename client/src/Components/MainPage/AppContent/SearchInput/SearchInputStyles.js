import styled from 'styled-components'
import { AppSalmon, AppBlue } from '../../../../theme/Colors';

export const SearchContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    border-radius:3px;
    padding-top: 0.5rem;
`;

export const Input = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height:50px;
    z-index:3
`;

export const IconPlus = styled.i`
    color: ${AppBlue};
    font-size: 2.3rem;
    padding-top:0.35rem;
    margin-left: 0.5rem;

    &:hover {
        color: ${AppSalmon};
    }
`;

export const TipTxt = styled.p`
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
        width: 85%;
    }
`;