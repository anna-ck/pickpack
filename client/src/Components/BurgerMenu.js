import React from 'react';
import styled from 'styled-components';
import BurgerCategory from './BurgerCategory';


const Menu = styled.div`
    width: 50%;
    margin: 0 auto;

    @media (max-width: 760px) {
        display: block;
        width: 50%;
    }
    @media (max-width: 550px) {
      width: 70%;
  }
`;

const MenuDropdown = styled.div`
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

const List = styled.ul`
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


function BurgerMenu (props, ref) {

  const categories = [
    {'Clothes': ['Male Clothes', 'Female Clothes']},
    {'Shoes': ['Male Shoes', 'Female Shoes']},
    {'Accessories': ['Male Accessories', 'Female Accessories']},
    {'Cosmetics': ['Male Cosmetics', 'Female Cosmetics']},
    {'Others': ['Electronics', 'Entertainment', 'Documents']}
  ];

  const handleChoice = (listName) => {
      props.handleChoice(listName)
  }

  return (
    <Menu ref={ref}>
      <MenuDropdown>
        <List>
            <BurgerCategory currentSearchList={props.currentSearchList} items={Object.keys(categories[0])} lists={Object.values(categories[0])} onClick={handleChoice}/>
            <BurgerCategory currentSearchList={props.currentSearchList} items={Object.keys(categories[1])} lists={Object.values(categories[1])} onClick={handleChoice}/>
            <BurgerCategory currentSearchList={props.currentSearchList} items={Object.keys(categories[2])} lists={Object.values(categories[2])} onClick={handleChoice}/>
            <BurgerCategory currentSearchList={props.currentSearchList} items={Object.keys(categories[3])} lists={Object.values(categories[3])} onClick={handleChoice}/>
            <BurgerCategory currentSearchList={props.currentSearchList} items={Object.keys(categories[4])} lists={Object.values(categories[4])} onClick={handleChoice}/>
        </List>
      </MenuDropdown>
    </Menu>
  )
}

export default React.forwardRef(BurgerMenu);
