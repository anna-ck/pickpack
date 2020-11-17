import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import {ModalBackground, ModalContent, ButtonX, Text, Buttons, Button} from './ModalWarningStyles'

function Portal (props) {
    const container = document.createElement('div')
    useEffect(() => {
      document.body.appendChild(container)
    })
    return (
      ReactDOM.createPortal(props.children, container)
    )
  }

function ModalWarning (props) {
    return (
      <Portal>
      <ModalBackground>
        <ModalContent>
          <ButtonX onClick={props.onCloseModalWarning}>x</ButtonX>
          <Text>You have unsaved changes on your packing list. {props.textMain} without saving changes will cause data loss.</Text>
          <Buttons>
            <Button onClick={props.onSaveAndConfirm} warning={false}>{props.textSave}</Button>
            <Button onClick={props.onConfirmWithoutSaving} warning={true}>{props.textDoNotSave}</Button>
          </Buttons>
        </ModalContent>
      </ModalBackground>
      </Portal>
    )
  }

  export default ModalWarning