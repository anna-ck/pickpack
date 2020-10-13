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
    {items: 'Clothes', lists: ['Male Clothes', 'Female Clothes']},
    {items: 'Shoes', lists: ['Male Shoes', 'Female Shoes']},
    {items: 'Accessories', lists: ['Male Accessories', 'Female Accessories']},
    {items: 'Cosmetics', lists: ['Male Cosmetics', 'Female Cosmetics']},
    {items: 'Others', lists: ['Electronics', 'Entertainment', 'Documents']}
  ];

  return (
    <Menu ref={ref}>
      <MenuDropdown>
        <Header>Categories</Header>
        <Underline />
        <List>
            <SearchCategory currentSearchList={props.currentSearchList} items={categories[0].items} lists={categories[0].lists} onClick={props.handleChoice}/>
            <SearchCategory currentSearchList={props.currentSearchList} items={categories[1].items} lists={categories[1].lists} onClick={props.handleChoice}/>
            <SearchCategory currentSearchList={props.currentSearchList} items={categories[2].items} lists={categories[2].lists} onClick={props.handleChoice}/>
            <SearchCategory currentSearchList={props.currentSearchList} items={categories[3].items} lists={categories[3].lists} onClick={props.handleChoice}/>
            <SearchCategory currentSearchList={props.currentSearchList} items={categories[4].items} lists={categories[4].lists} onClick={props.handleChoice}/>
        </List>
      </MenuDropdown>
    </Menu>
  )
}

export default React.forwardRef(SearchMenu);
