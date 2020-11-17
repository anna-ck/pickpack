import React from 'react';
import {RowMain, RowMainContent, RowSecondary, CatName, List} from './BurgerCategoryStyles'

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