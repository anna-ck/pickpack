import styled from 'styled-components';

export const Menu = styled.div`
    width: 50%;
    margin: 0 auto;

    @media (max-width: 760px) {
        display: block;
        width: 50%;
    }

    @media (max-width: 550px) {
      width: 70%;
    }

    @media print {
        display: none;
        visibility:hidden
    }
`;

export const MenuDropdown = styled.div`
    width: calc(100% -6px);
    height: 412px;
    overflow: scroll;
    background-color: ${({ theme }) => theme.menu};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 760px) {
      height: 342px;
      padding: 3rem 0rem;
      overflow: scroll;
    }
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    padding-left: 1rem;
    padding-top: 0.4rem;

    @media (max-width: 760px) {
        padding-left: 0;
        height: 342px;
    }
`;