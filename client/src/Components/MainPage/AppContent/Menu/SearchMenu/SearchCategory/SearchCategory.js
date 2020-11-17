import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentSearchList} from '../../../../../../reducers';
import {RowMain, RowMainContent, RowSecondary, Icon, IconDiv, CatName, List} from './SearchCategoryStyles'

function SearchCategory ({items, lists, onClick}) {
    const currentSearchList = useSelector(getCurrentSearchList)
    const [open, setOpen] = useState(false);

    const handleChoice =  (listName) => {
        onClick(listName);
    };

    return (
        <RowMain >
                <IconDiv onClick={() => setOpen(!open)}>
                    <Icon open={open} large={true} className="fas fa-arrow-circle-down"/>
                    <Icon open={!open} large={true} className="fas fa-arrow-circle-right"/>
                    <CatName>{items}</CatName>
                </IconDiv>
                <RowMainContent open={open}>
                    <List>
                      {lists.map((list) => {
                          return (
                            <RowSecondary key={list} active={list === currentSearchList ? true : false} onClick={() => handleChoice(list)}>
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