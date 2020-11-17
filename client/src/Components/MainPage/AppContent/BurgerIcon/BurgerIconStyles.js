import styled from 'styled-components';

export const IconContainer = styled.div``;

export const Icon = styled.i`
    padding: 1rem;
    color: ${({ theme }) => theme.span};
    position: relative;
    top: 3rem;
    z-index: 20;
    display: ${({ active, isVisible }) => (isVisible && active === true ? "block" : "none")};
    width: 45%;
    margin: 0 auto;

    @media (max-width: 550px) {
        width: 65%;
    }
`;