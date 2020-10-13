import React, {useRef} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const LoginPageWrapper = styled.form`
    margin: 50px auto;
    border: 2px solid black;
    padding: 20px;
    text-align: center;
    width: 60%
`;

function LoginPanel (props) {
    const loginRef = useRef();
    const passwordRef = useRef();

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLogin({
            login: loginRef.current.value,
            password: passwordRef.current.value
        });
        loginRef.current.value = '';
        passwordRef.current.value = '';
        history.push('/')
    }

    const handlePanelChange = () => {
        history.push('/register')
    }

    return (
        <LoginPageWrapper>
                <label>login
                    <input ref={loginRef} type='text' defaultValue='anna'/>
                </label>
                <br/>
                <label>password
                    <input ref={passwordRef} type='password' defaultValue='secret123'/>
                </label>
                <br/>
                <button onClick={handleSubmit}>Log in</button>
                <br/>
                <br/>
                <button onClick={handlePanelChange}>not registered yet? register now</button>
        </LoginPageWrapper>
    )
}

export default LoginPanel