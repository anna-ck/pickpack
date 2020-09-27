import React from 'react';
import styled from 'styled-components';
import SearchCategory from './SearchCategory';
import * as colors from '../theme/Colors';

const Menu = styled.div`
    width: 50%;
    margin: 0 auto;
`;

const MenuDropdown = styled.div`
    width: calc(100% -6px);
    height: 412px;
    overflow: scroll;
    background-color: ${({ theme }) => theme.menu};
`;

const Header = styled.h2`
    padding: 2.2rem 0.8rem 1.7rem 0.8rem;
    letter-spacing: 0.04rem;
    text-align: center;
    font-size: 1.1rem;
`;

const Underline = styled.hr`
    width: 70%;
    margin: 0 auto;
    border: 1px solid ${colors.AppBlue};
    margin-bottom: 0.5rem
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding-left: 1rem;
    padding-top: 0.4rem;
`;


function SearchMenu (props, ref) {

  const categories = [
    {'Clothes': ['Male Clothes', 'Female Clothes']},
    {'Shoes': ['Male Shoes', 'Female Shoes']},
    {'Accessories': ['Male Accessories', 'Female Accessories']},
    {'Cosmetics': ['Male Cosmetics', 'Female Cosmetics']},
    {'Others': ['Electronics', 'Entertainment', 'Documents']}
  ];

  return (
    <Menu ref={ref}>
      <MenuDropdown>
        <Header>Categories</Header>
        <Underline />
        <List>
            <SearchCategory currentList={props.currentList} items={Object.keys(categories[0])} lists={Object.values(categories[0])} onClick={props.handleChoice}/>
            <SearchCategory currentList={props.currentList} items={Object.keys(categories[1])} lists={Object.values(categories[1])} onClick={props.handleChoice}/>
            <SearchCategory currentList={props.currentList} items={Object.keys(categories[2])} lists={Object.values(categories[2])} onClick={props.handleChoice}/>
            <SearchCategory currentList={props.currentList} items={Object.keys(categories[3])} lists={Object.values(categories[3])} onClick={props.handleChoice}/>
            <SearchCategory currentList={props.currentList} items={Object.keys(categories[4])} lists={Object.values(categories[4])} onClick={props.handleChoice}/>
        </List>
      </MenuDropdown>
    </Menu>
  )
}

export default React.forwardRef(SearchMenu);
