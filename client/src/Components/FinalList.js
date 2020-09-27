import React, { useState, useEffect } from 'react';
import ItemFinal from './ItemFinal';
import styled from 'styled-components';
import { AppSalmon } from '../theme/Colors';

const FinalListWrapper = styled.div`
  @media (max-width: 690px) {
   margin: 0 auto;
}
`;

const Header = styled.div`
    display:flex;
    flex-direction: column;
    width: calc(100% - 4px);
    height: 4.4rem;
    color: white;
    font-size: 1.6rem;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding:0.2rem 0rem;
    margin:0rem;
    background-color: ${({ theme }) => theme.headerFinal};
    border: 2px solid ${({ theme }) => theme.headerFinal};
    border-radius:2px;

    @media print {
      height: auto;
   }
`;

const List = styled.div`
    background: repeating-linear-gradient( ${({ theme }) => theme.menu}, ${({ theme }) => theme.menu} 34px, ${({ theme }) => theme.results} 34px, ${({ theme }) => theme.results} 35px); 
    height: 462px; 
    width: 100%;
    border: 1px solid inherit;
    border-radius:2px;
    overflow: scroll;
    border-collapse: collapse;
    margin:0rem;
`;

const HeaderLarge = styled.div``;

const HeaderSmall= styled.div`
    font-size: 0.85rem;
    text-align: center;
    padding: 0.5rem 0.3rem 0rem 0.3rem;

    @media (max-width: 690px) {
      font-size: 0.7rem
  }

    @media print {
      display: none;
      visibility:hidden
   }
`;

const Icon = styled.i`
    &:hover {
      color: ${AppSalmon}
    }
`;

const Input = styled.input`
    background-color: ${({ theme }) => theme.headerFinal};
    width: 11rem;
    border:none;
    text-align: center;
    font-size: 1.3rem;
    font-family: 'Rowdies', cursive;
    color: white;
    padding: 0.2rem 0rem
`;

const Row = styled.table`
    width: 100%;
`;

function FinalList (props) {
  const [items, setItems] = useState(props) || [];
  useEffect(() => {setItems(props);}, [props, setItems]);


  return (
    <FinalListWrapper>
      <Header>
        <HeaderLarge>
          <Icon className="far fa-star"></Icon>
          <Input defaultValue='My Packing List' maxLength='12'/>
          <Icon className="far fa-star"></Icon>
        </HeaderLarge>
        <HeaderSmall className='my-list__header-small'>
            Tip: you can change the number of items to pack and describe them
        </HeaderSmall>
      </Header>
      <List id='toPrint'>
          {items.pickedItems.map((item, i) => {
              return (
                  <Row key={'item_' + i}>
                      <ItemFinal item={item} onChange={props.onChange}/>
                  </Row>
              )
          })}
      </List>
    </FinalListWrapper>
  )
}

export default FinalList;