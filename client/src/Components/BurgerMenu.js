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
    {items: 'Clothes', lists: ['Male Clothes', 'Female Clothes']},
    {items: 'Shoes', lists: ['Male Shoes', 'Female Shoes']},
    {items: 'Accessories', lists: ['Male Accessories', 'Female Accessories']},
    {items: 'Cosmetics', lists: ['Male Cosmetics', 'Female Cosmetics']},
    {items: 'Others', lists: ['Electronics', 'Entertainment', 'Documents']}
  ];

  const handleChoice = (listName) => {
      props.handleChoice(listName)
  }

  return (
    <Menu ref={ref}>
      <MenuDropdown>
        <List>
          {categories.map((category) => {
            return <BurgerCategory currentSearchList={props.currentSearchList} items={category.items} lists={category.lists} onClick={handleChoice}/>
          })}
        </List>
      </MenuDropdown>
    </Menu>
  )
}

export default React.forwardRef(BurgerMenu);
