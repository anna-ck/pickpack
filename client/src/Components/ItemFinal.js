import React, { useState, useEffect, useRef }  from 'react';
import styled from 'styled-components';
import { AppSalmon } from '../theme/Colors';

const RowWrapper = styled.thead``;

const Item = styled.tr`
    padding: 0rem 0.1rem 0rem 0.1rem;
    height: 35px;
    display:flex;
    justify-content:space-between;
    align-items:center;

    @media (max-width: 600px) {
      font-size: 0.9rem;
  }
`;

const TdSmall = styled.td`
    text-align: left;
    width: 5%;
    padding: 0rem 0.5rem;

    &:hover {
      color: ${AppSalmon}
    }

    @media print {
      display: ${({ hide }) => (hide ? 'none' : 'block')};
    }
`;

const TdLarge = styled.td`
    text-align: left;
    width: 22%
`;

const TdXLarge = styled.td`
    width: 63%
`;

const TdArrows = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width:100%;
    padding:0;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.txt};
    text-align: center;
    height: 33px;
    background-color: inherit;
    border:none;

    @media (max-width: 600px) {
      font-size: 0.9rem;
  }
`;

const Arrow = styled.td`
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: ${({ up }) => (up ? 'none' : '10px solid black')};
    border-bottom: ${({ up }) => (up ? '10px solid black' : 'none')};
    width: 0;
    height: 0;

    &:hover {
      border-top: ${({ up, theme }) => (up ? 'none' : `10px solid ${theme.span}`)};
      border-bottom: ${({ up, theme }) => (up ? `10px solid ${theme.span}` : 'none')};
    }

    @media (max-width: 600px) {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: ${({ up }) => (up ? 'none' : '6px solid black')};
      border-bottom: ${({ up }) => (up ? '6px solid black' : 'none')};

      &:hover {
        border-top: ${({ up, theme }) => (up ? 'none' : `6px solid ${theme.span}`)};
        border-bottom: ${({ up, theme }) => (up ? `6px solid ${theme.span}` : 'none')};
      }
  }
`;

const Txt = styled.p`
    font-size: 0.8rem;
`;


function ItemFinal (props) {
  const [item, setItem] = useState(props.item);
  //const [number, setNumber] = useState('');

  const finalNumberRef = useRef()
  useEffect(() => {setItem(props.item);}, [props]);

  const handleRemove = () => {
    const number = 0
    handleChange(number)
  }

const handlePlus = () => {
  const number = +item.number + 1
  handleChange(number)
}

const handleMinus = () => {
  const number = +item.number -1
  handleChange(number)
}

const handleChange = (number) => {
  const finalItem = {}
  finalItem.name = item.name
  finalItem.number = number
  finalItem.id = item.id
  props.onChange(finalItem)
}


    return (
      <RowWrapper>
        <Item>
          <TdSmall hide={true} className="fas fa-times" onClick={handleRemove}></TdSmall>
          <TdLarge>{item.name}</TdLarge>
          <TdSmall hide={false}>
            <Txt ref={finalNumberRef}>{item.number}</Txt>
          </TdSmall>
          <Arrow hide={true} up={true} onClick={handlePlus}/>
          <Arrow hide={true} up={false} onClick={handleMinus}/>
          <TdXLarge>
            <Input type='text' maxLength='21' placeholder='describe items'/>
          </TdXLarge>
        </Item>
      </RowWrapper>
    )
    }

export default ItemFinal;