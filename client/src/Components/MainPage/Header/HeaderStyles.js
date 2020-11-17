import styled from 'styled-components';

export const DivHeader = styled.div`
    text-align: center;
    padding: 1rem 0rem 2.5rem 0rem;
    margin: 0 auto;
    margin-top:  ${({ currentUser }) => (currentUser ? '0rem' : '2rem')};
    color: ${({ theme }) => theme.appHeader};
`
export const LargeHeader = styled.h1`
    font-family: 'Rowdies', cursive;
    font-size: 3.5rem;
    letter-spacing: 0.1rem;
    text-align: center;
    padding-top: 1.7rem;
    font-weight: 400;

    @media (max-width: 690px) {
        font-size: 2.5rem
    }
`
export const SmallHeader = styled.p`
    text-align: center;
    font-family: 'Rowdies', cursive;
    padding: 1.2rem;
    font-weight: 300;

    span {
        color: ${({ theme }) => theme.span};
    }

    @media (max-width: 690px) {
        font-size: 1rem
    }

    @media print {
        display: none;
        visibility:hidden
    }
`;