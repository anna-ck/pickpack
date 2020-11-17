import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import {PopUpBackground, PopUpContent, Text, Button} from './PopUpInfoStyles'

function Portal (props) {
    const container = document.createElement('div')
    useEffect(() => {
      document.body.appendChild(container)
    })
    return (
      ReactDOM.createPortal(props.children, container)
    )
  }

function PopUpInfo ({onClose}) {
    return (
      <Portal>
      <PopUpBackground>
        <PopUpContent>
            <Text>You have been logged out because your session has expired</Text>
            <Button onClick={onClose}>OK</Button>
        </PopUpContent>
      </PopUpBackground>
      </Portal>
    )
  }

  export default PopUpInfo