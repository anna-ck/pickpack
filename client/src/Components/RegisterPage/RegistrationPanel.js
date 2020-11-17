import React, {useRef, useState} from 'react';
import { useHistory } from "react-router-dom";

import AuthenticationApi from '../../api/fetchAuthentication';

import {RegisterPageWrapper, RegisterWindow, Text, Input, Message, RegisterButton, LoginButton} from './RegistrationPanelStyles'

function RegistrationPanel (props) {
    const loginRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [message, setMessage] = useState('');

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            login: loginRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        }
        AuthenticationApi.register(credentials)
        .then((response) => {
            setMessage(response.message)
            loginRef.current.value='';
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            history.push('/login')
        })
        .catch((error) => {
            setMessage(error.message)
        })
    }

    const handlePanelChange = () => {
        history.push('/login')
    }

    return (

        <RegisterPageWrapper>
            <RegisterWindow>
            <Text>Sign up to<br/><span>Pick&amp;Pack</span></Text>
                    <Input ref={loginRef} type='text' placeholder="Username" />
                    <Input ref={emailRef} type='text' placeholder="Email" />
                    <Input ref={passwordRef} type='password' placeholder='Password'/>
                    <Input ref={confirmPasswordRef} type='password' placeholder='Confirm password'/>
                <RegisterButton onClick={handleSubmit}>Create account</RegisterButton>
                <Message message={message}>{message? message : null}</Message>
                <LoginButton onClick={handlePanelChange}>Already have an account? <span>Sign in</span></LoginButton>
            </RegisterWindow>
        </RegisterPageWrapper>
    )
}

export default RegistrationPanel