import React, {useRef} from 'react';
import styled from 'styled-components';

const LoginPageWrapper = styled.form`
    margin: 50px auto;
    border: 2px solid black;
    padding: 20px;
    text-align: center;
    width: 60%
`;

function LoginPanel (props) {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLogin({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    return (
        <LoginPageWrapper>
                <label>email
                    <input ref={emailRef} type='text' defaultValue='example@example.com'/>
                </label>
                <br/>
                <label>password
                    <input ref={passwordRef} type='password' defaultValue='secret'/>
                </label>
                <br/>
                <button onClick={handleSubmit}>Log in</button>
                <br/>
                <br/>
                <button onClick={props.onPanelChange}>not registered yet? register now</button>
        </LoginPageWrapper>
    )
}

export default LoginPanel