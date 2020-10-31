import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {getSearchResults, getCurrentSearchList} from '../reducers';

const RowMain = styled.li`
    text-decoration: none;
    padding: 0.5rem 0rem 0.5rem 0rem;
    margin: 0rem 0.3rem 0rem 0.3rem;

    &:hover :nth-child(2) {
        display:flex;
    };

    @media (max-width: 760px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        padding: 1.2rem 0rem 1.2rem 0rem;
    }
`;

const CatName = styled.p`
    padding: ${({ hovered }) => hovered? '0.4rem 0.6rem' : '0.4rem 0rem 0.4rem 0rem'};
    margin: ${({ hovered }) => hovered? '0.1rem 0.5rem' : '0rem'};
    font-weight: 300;
    width: 10rem;
    display: block;
    text-align: center;
    color: ${({ hovered, theme }) => hovered? 'salmon': theme.txt};
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    border: ${({ hovered }) => hovered? '1px solid grey' : 'none'};
    border-radius: 4px;

    @media (max-width: 760px) {
        text-align: center;
        width: 6.5rem;
        font-size: 0.97rem;
    }

    &:hover {
        color: ${({ hovered, theme }) => hovered? theme.hover2 :'inherit'};
        background-color: ${({ hovered, theme }) => hovered? theme.results :theme.menu};
        cursor: pointer;
    }
`;

const RowSecondary = styled.li`
    display: inline-flex;
    align-items:center;
    justify-content:center;
    font-size: 0.6rem;
`;

const RowMainContent = styled.div`
    display: none;
    padding:0;
    margin:0;

    &:hover {
        cursor: pointer;
    }
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0rem;
    margin: 0;
    
    @media (max-width: 760px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items:center;
    }
`;

function BurgerCategory (props) {
    const [items] = React.useState(props.items);
    const [lists] = React.useState(props.lists);
    const [open, setOpen] = React.useState(false);

    const handleChoice =  (e, listName) => {
        props.onClick(listName);
    };

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <RowMain setOpen={setOpen}>
                <div id='cat-name'><CatName hovered={false} onClick={handleOpen}>{items}</CatName></div>
                <RowMainContent open={open}>
                    <List>
                      {lists.map((list) => {
                          return (
                            <RowSecondary key={list} onClick={(e) => handleChoice(e, list)}>
                              <CatName hovered={true}>{list.split(' ')[0]}</CatName>
                            </RowSecondary>
                          )
                      })}
                    </List>
                </RowMainContent>
        </RowMain>
    )
}

export default BurgerCategory