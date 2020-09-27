import React from 'react';
import styled from 'styled-components';

const RowMain = styled.li`
    text-decoration: none;
    padding: 0.5rem 0rem 0.5rem 0rem;
`;

const IconDiv = styled.div`
    display: inline-flex;
    align-items: center
`;

const Icon = styled.i`
    padding: 0.6rem 0.6rem;
    font-size: ${({large }) => (large ? "1.6rem" : "1.3rem")};
    display: ${({open }) => (open ? "none" : "block")};
    color: ${({ theme }) => theme.hover};
    &:hover {
        color: ${({ theme }) => theme.hover};
        cursor: pointer;
    }
`;

const CatName = styled.p`
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

const RowSecondary = styled.li`
    padding:0rem;
    display: inline-flex;
    align-items: center;
    background-color: ${({ theme, active }) => (active ? theme.active : theme.menu)};
`;

const RowMainContent = styled.div`
    display: ${({ open }) => (open ? "flex" : "none")};
    &:hover {
    cursor: pointer;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 0rem 0rem 0rem 1rem;
`;

function SearchCategory (props) {
    const [items] = React.useState(props.items);
    const [lists] = React.useState(props.lists);
    const [currentList, setCurrentList] = React.useState(props.currentList)
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {setCurrentList(props.currentList);}, [props])


    const handleChoice =  (e, listName) => {
        props.onClick(listName);
    };

    const handleActive = (lst) => {
        if (lst === currentList) {
          return true
        }
        else {
          return false
        }
    };

    return (
        <RowMain setOpen={setOpen} >
                <IconDiv onClick={() => setOpen(!open)}>
                    <Icon open={open} large={true} className="fas fa-arrow-circle-down"/>
                    <Icon open={!open} large={true} className="fas fa-arrow-circle-right"/>
                    <CatName>{items}</CatName>
                </IconDiv>
                <RowMainContent open={open}>
                    <List>
                      {lists[0].map((list) => {
                          return (
                            <RowSecondary key={list} active={handleActive(list)} onClick={(e) => handleChoice(e, list)}>
                              <Icon large={false} className="fas fa-search"></Icon>
                              <CatName>{list}</CatName>
                            </RowSecondary>
                          )
                      })}
                    </List>
                </RowMainContent>
        </RowMain>
    )
}

export default SearchCategory