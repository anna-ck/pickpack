import React, {useRef, useState} from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { setUser } from '../../actions';

import AuthenticationApi from '../../api/fetchAuthentication';

import {LoginPageWrapper, LoginWindow, Text, Input, LoginButton, Message, RegisterButton, ReturnButton} from './LoginPanelStyles'

function LoginPanel () {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch()

    const loginRef = useRef();
    const passwordRef = useRef();

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            login: loginRef.current.value,
            password: passwordRef.current.value
        }
        AuthenticationApi.login(credentials)
        .then((response) => {
            dispatch(setUser(response))
            loginRef.current.value = '';
            passwordRef.current.value = '';
            history.push('/')
          })
        .catch((error) => {
            setMessage(error.message)
        })
    }

    return (
        <LoginPageWrapper>
            <LoginWindow>
            <Text>Welcome to <br/><span>Pick&amp;Pack</span></Text>
                    <Input ref={loginRef} type='text' placeholder="Username" />
                    <Input ref={passwordRef} type='password' placeholder='Password' />
                <LoginButton onClick={handleSubmit}>Log in</LoginButton>
                <Message>{message ? message : null}</Message>
                <RegisterButton onClick={() => history.push('/register')}>Not on Pick&amp;Pack yet?  <span>Sign up</span></RegisterButton>
                <ReturnButton onClick={() => history.push('/')}>Use Pick&amp;Pack as an anonymous user</ReturnButton>
            </LoginWindow>
        </LoginPageWrapper>
    )
}

export default LoginPanel