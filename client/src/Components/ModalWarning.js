import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalBackground= styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.2);
    z-index: 50;
`;

const ModalContent= styled.div`
    background-color: red;
    padding: 5rem
`;

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
          <button onClick={props.onCloseModalWarning}>x</button>
          <h1>You have unsaved changes on your packing list. Creating new list without saving changes will cause data loss</h1>
          <button onClick={props.onConfirmWithoutSaving}>Create a new empty list without saving changes</button>
          <button onClick={props.onSaveAndConfirm}>Save current list before creating a new one</button>
        </ModalContent>
      </ModalBackground>
      </Portal>
    )
  }

  export default ModalWarning