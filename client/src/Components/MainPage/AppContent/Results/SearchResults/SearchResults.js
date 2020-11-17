import React from 'react';
import {ItemResult} from '../ItemResult';
import suitcase from '../../../../../Images/suitcase.png';
import {useSelector} from 'react-redux';
import {getSearchResults, getCurrentSearchList} from '../../../../../reducers';
import {ItemWrapper, ResultsWrapper, Img, InfoLarge, InfoSmall, InfoWrapper, ListName, ListWrapper} from './SearchResultsStyles'

const Info = () => {
  return (
    <InfoWrapper>
      <Img src={suitcase}/>
      <InfoLarge>Ooops! It's <span>empty</span>!</InfoLarge>
      <InfoSmall>Your recent searches will appear here.</InfoSmall>
    </InfoWrapper>
  )
}

function SearchResults (props, ref) {

  const searchResults = useSelector(getSearchResults)
  const currentSearchList = useSelector(getCurrentSearchList)

  const handleResultChange = (item) => {
    props.onCheck(item)
  }

  return (
      <ResultsWrapper ref={ref}>
        <ListName>{currentSearchList || <Info/>}</ListName>
        <ListWrapper>
          {searchResults.map((item, i) => {
              return (
                  <ItemWrapper key={'item_' + i}>
                      <ItemResult item={item} onCheck={handleResultChange} />
                  </ItemWrapper>
              )
          })}
        </ListWrapper>
      </ResultsWrapper>
  )
}

export default React.forwardRef(SearchResults);
