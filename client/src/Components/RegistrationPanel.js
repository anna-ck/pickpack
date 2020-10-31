import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { AppBlue, AppSalmon } from '../theme/Colors';

import AuthenticationApi from '../api/fetchAuthentication';

const RegisterPageWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const RegisterWindow = styled.form`
    margin: 0 auto;
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.menu};
    border: 1px solid grey;
    border-radius: 7px;
`;

const Text = styled.p`
    font-size: 1.8rem;
    padding: 0rem 1.5rem 1.5rem 1.5rem;
    text-align: center;
    line-height: 2.5rem;
    letter-spacing: 0.05rem;
    
    span {
        color: ${({ theme }) => theme.span};
    }
`;

const Input = styled.input`
    font-family: FontAwesome
    font-size: 1rem;
    background-color: white;
    width: 12rem;
    height: 1.7rem;
    margin: 0.3rem;
    border: 2px solid grey;
    border-radius: 4px;
    padding: 3px;
`;

const Message = styled.div`
    padding: 2rem 2rem 1rem 2rem;
    height: 2rem;
    width: 14rem;
    text-align: center;
    color: ${({ message }) => (message === 'You have been successfully registered!' ? 'green' : 'red')};
`;

const RegisterButton = styled.button`
    font-size: 1rem;
    background-color:${AppSalmon};
    width: 12.6rem;
    height: 2.1rem;
    margin: 0.3rem;
    border: 2px solid grey;
    border-radius: 4px;
`;

const LoginButton = styled.button`
    font-size: 1rem;
    background-color: inherit;
    border: none;
    padding: 1rem 2rem;
    color: ${({ theme }) => theme.txt};

    span {
        font-weight: 700;
    }

    &:hover {
        span {
            color: red;
        }
    }
`;

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
            <Text>Sign up to<br/><span>Pick&Pack</span></Text>
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