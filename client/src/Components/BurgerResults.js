import React from 'react';
import ItemResult from './ItemResult';
import styled from 'styled-components';
import suitcase from '../Images/suitcase.png';
import {useSelector} from 'react-redux';
import {getSearchResults, getCurrentSearchList} from '../reducers';

const ResultsWrapper = styled.div`
    text-align: center;
    background-color: ${({ theme }) => theme.burgerResults};
    opacity: 0.9;
    height: 412px;
    overflow: scroll;
    width: 50%;
    border-left: 3px solid rgb(18, 186, 216);
    
    @media (max-width: 760px) {
      width: 50%;
      margin: 0 auto;
      border: 0;
      display: none;
    }

    @media (max-width: 550px) {
      width: 70%;
    }
`;

const ListName = styled.h2`
    margin: 1.5rem 3rem 1.5rem 3rem;
    padding:0.5rem;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;;
    font-weight: 500;
    border:1px solid inherit;
    border-radius:3px;
    line-height: 1.4rem;
`;

const ListWrapper = styled.ul``;

const ItemWrapper = styled.li`
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 0.94rem;
`;

const InfoWrapper = styled.div`
    padding: 3rem 0rem;

    @media (max-width: 760px) {
      padding-top: 1.5rem;
      padding-bottom: 0rem;
    }
`;

const InfoLarge = styled.h1`
    font-size: 1.05rem;
    padding-top: 1.5rem;
    color: ${({ theme }) => theme.txt};

    span {
      color: ${({ theme }) => theme.span};
      font-weight: 550;
    }
`;

const InfoSmall = styled.p`
    font-size: 0.8rem;
    padding-top: 1.5rem;
    line-height: 1.05rem;
    width: 90%;
    margin: 0 auto;
`;

const Img = styled.img`
    width: 110px;
    height: auto;
    
    @media (max-width: 760px) {
      width: 70px;
      margin: 0 auto;
  }
`;

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
