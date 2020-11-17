import React, { useState, useEffect }  from 'react';

import {RowWrapper, Item, TdSmall, TdLarge, TdXLarge, Input, Arrow, Txt} from './ItemFinalStyles'


function ItemFinal (props) {
  const [item, setItem] = useState(props.item);

  useEffect(() => {
    props.onChange(item) 
  }, [item]);

  useEffect(() => {
    if (props.item.id !== item.id || props.item.number !== item.number) {
      setItem(props.item)
  }}, [props.item]);

  const handleRemove = () => {
    setItem({...item, number: 0})
    props.onItemModification()
  }

  const handlePlus = () => {
    if (+item.number === 99) {
      return
    }
    setItem({...item, number: +item.number + 1})
    props.onItemModification()
  }

  const handleMinus = () => {
    setItem({...item, number: +item.number - 1})
    props.onItemModification()
  }

  const addItemDescription = (e) => {
    const desc = e.target.value || ''
    setItem({...item, description: desc})
    props.onItemModification()
  }


    return (
      <RowWrapper>
        <Item>
          <TdSmall hide={true} className="fas fa-times" onClick={handleRemove}></TdSmall>
          <TdLarge>{item.name}</TdLarge>
          <TdSmall hide={false}>
            <Txt>{item.number}</Txt>
          </TdSmall>
          <Arrow hide={true} up={true} onClick={handlePlus}/>
          <Arrow hide={true} up={false} onClick={handleMinus}/>
          <TdXLarge>
            <Input type='text' maxLength='21' placeholder='describe item(s)' onChange={addItemDescription} value={item.description}/>
          </TdXLarge>
        </Item>
      </RowWrapper>
    )
    }

export default ItemFinal;