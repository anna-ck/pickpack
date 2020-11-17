import React from 'react';
import {SearchCategory} from './SearchCategory';
import {Menu, MenuDropdown, Header, Underline, List} from './SearchMenuStyles'


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
        {categories.map((category, index) => {
              return <SearchCategory key={index} items={category.items} lists={category.lists} onClick={props.handleChoice}/>
          })}
        </List>
      </MenuDropdown>
    </Menu>
  )
}

export default React.forwardRef(SearchMenu);
