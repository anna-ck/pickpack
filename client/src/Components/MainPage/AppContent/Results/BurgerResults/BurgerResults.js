import React from 'react';
import {ItemResult} from '../ItemResult';
import suitcase from '../../../../../Images/suitcase.png';
import {useSelector} from 'react-redux';
import {getSearchResults, getCurrentSearchList} from '../../../../../reducers';
import {ListName, ListWrapper, InfoWrapper, InfoSmall, InfoLarge, Img, ItemWrapper, ResultsWrapper} from './BurgerResultsStyles'

function BurgerResults (props, ref) {

  const searchResults = useSelector(getSearchResults)
  const currentSearchList = useSelector(getCurrentSearchList)

  const Info = () => {
    return (
      <InfoWrapper>
        <Img src={suitcase}/>
        <InfoLarge>Ooops! It's <span>empty</span>!</InfoLarge>
        <InfoSmall>Your recent searches will appear here.</InfoSmall>
      </InfoWrapper>
    )
  }
  
  return (
      <ResultsWrapper ref={ref}>
        <ListName>{currentSearchList || <Info/>}</ListName>
        <ListWrapper>
          {searchResults.map((item, i) => {
              return (
                  <ItemWrapper key={'item_' + i}>
                      <ItemResult item={item} onCheck={props.onCheck}/>
                  </ItemWrapper>
              )
          })}
        </ListWrapper>
      </ResultsWrapper>
  )
}

export default React.forwardRef(BurgerResults);
