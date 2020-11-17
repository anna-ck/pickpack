import styled from 'styled-components';
import * as colors from '../../../../../theme/Colors';

export const Menu = styled.div`
    width: 50%;
    margin: 0 auto;
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
`;

export const Header = styled.h2`
    padding: 2.2rem 0.8rem 1.7rem 0.8rem;
    letter-spacing: 0.04rem;
    text-align: center;
    font-size: 1.1rem;
`;

export const Underline = styled.hr`
    width: 70%;
    margin: 0 auto;
    border: 1px solid ${colors.AppBlue};
    margin-bottom: 0.5rem
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding-left: 1rem;
    padding-top: 0.4rem;
`;