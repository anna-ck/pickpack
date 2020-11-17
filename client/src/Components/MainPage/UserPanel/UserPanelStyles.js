import styled from 'styled-components';
import { AppSalmon, AppBlue } from '../../../theme/Colors';

export const Greeting = styled.div`
    padding: 4rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Icon= styled.div`
    font-size: 6rem;
    margin-top: 2rem;
`;

export const Message= styled.h4`
    font-size: 1.2rem;
    padding: 1rem;
`;

export const LogoutButton = styled.button`
    background-color: ${({ theme }) => theme.searchInput};
    margin-top: 3rem;
    padding: 0.3rem 0.9rem;
    border: 2px solid ${AppSalmon};
    border-radius: 5px;
    color: ${({ theme }) => theme.txt};
    
    &:hover {
        border-color: ${AppBlue};
    }
`;

export const ToggleUserButton = styled.button`
    position: fixed;
    top: 1rem;
    left: 1rem;
    display: none;
    padding: 1rem 1.3rem;
    margin: 1rem 1rem 2.5rem 1rem;
    font-size: 1rem;
    border: none;
    background-color: inherit;
    color: ${({ theme }) => theme.txt};

    &:hover {
      color: ${({ theme }) => theme.span};
    }

    @media (max-width: 760px) {
      display: block;
    }
`;