import React, {useRef, useState} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { AppBlue, AppSalmon } from '../theme/Colors';
import {useDispatch} from 'react-redux'
import { setUser } from '../actions';

import AuthenticationApi from '../api/fetchAuthentication';

const LoginPageWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoginWindow = styled.form`
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

const LoginButton = styled.button`
    font-size: 1rem;
    background-color:${AppSalmon};
    width: 12.6rem;
    height: 2.1rem;
    margin: 0.3rem;
    border: 2px solid grey;
    border-radius: 4px;
`;

const Message = styled.p`
    padding: 1rem 2rem 1rem 2rem;
    height: 1rem;
    color: red;
`;

const RegisterButton = styled.button`
    font-size: 1rem;
    background-color: inherit;
    border: none;
    padding: 1rem 2rem 0rem 2rem;
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

const ReturnButton = styled.button`
    font-size: 0.8rem;
    background-color: white;
    width: 15.6rem;
    height: 2.8rem;
    margin: 2rem 0.3rem 0rem 0.3rem;
    border: 2px solid grey;
    border-radius: 4px;
    
    &:hover {
        border-color: ${AppBlue}
    }
`;

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
            //sessionStorage.setItem("user", JSON.stringify(response));
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
            <Text>Welcome to <br/><span>Pick&Pack</span></Text>
                    <Input ref={loginRef} type='text' placeholder="Username" />
                    <Input ref={passwordRef} type='password' placeholder='Password' />
                <LoginButton onClick={handleSubmit}>Log in</LoginButton>
                <Message>{message ? message : null}</Message>
                <RegisterButton onClick={() => history.push('/register')}>Not on Pick&Pack yet?  <span>Sign up</span></RegisterButton>
                <ReturnButton onClick={() => history.push('/')}>Use Pick&Pack as an anonymous user</ReturnButton>
            </LoginWindow>
        </LoginPageWrapper>
    )
}

export default LoginPanel