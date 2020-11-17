import React from 'react';
import {BurgerCategory} from './BurgerCategory';
import {Menu, MenuDropdown, List} from './BurgerMenuStyles'

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
          {categories.map((category, index) => {
            return <BurgerCategory key={index} items={category.items} lists={category.lists} onClick={handleChoice}/>
          })}
        </List>
      </MenuDropdown>
    </Menu>
  )
}

export default React.forwardRef(BurgerMenu);