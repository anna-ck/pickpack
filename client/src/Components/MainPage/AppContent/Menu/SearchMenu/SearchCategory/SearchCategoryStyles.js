import styled from 'styled-components';

export const RowMain = styled.li`
    text-decoration: none;
    padding: 0.5rem 0rem 0.5rem 0rem;
`;

export const IconDiv = styled.div`
    display: inline-flex;
    align-items: center
`;

export const Icon = styled.i`
    padding: 0.6rem 0.6rem;
    font-size: ${({large }) => (large ? "1.6rem" : "1.3rem")};
    display: ${({open }) => (open ? "none" : "block")};
    color: ${({ theme }) => theme.hover};
    &:hover {
        color: ${({ theme }) => theme.hover};
        cursor: pointer;
    }
`;

export const CatName = styled.p`
    padding-left: 0.5rem;
    font-size: 1rem;
    font-weight: 300;
    width: 10rem;
    color: ${({ theme }) => theme.txt};
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    @media (max-width: 600px) {
        font-size: 0.9rem;
    }
    &:hover {
        color: ${({ theme }) => theme.hover};
        cursor: pointer;
    }
`;

export const RowSecondary = styled.li`
    padding:0rem;
    display: inline-flex;
    align-items: center;
    background-color: ${({ theme, active }) => (active ? theme.active : theme.menu)};
`;

export const RowMainContent = styled.div`
    display: ${({ open }) => (open ? "flex" : "none")};
    &:hover {
    cursor: pointer;
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 0rem 0rem 0rem 1rem;
`;