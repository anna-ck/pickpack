import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const RegistrationPageWrapper = styled.form`
    margin: 50px auto;
    border: 2px solid black;
    padding: 20px;
    text-align: center;
    width: 60%
`;

function RegistrationPanel (props) {
    const loginRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [message, setMessage] = useState(props.registerMessage);

    const history = useHistory();

    useEffect(() => {
        setMessage(props.registerMessage)
    }, [props])

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onRegister({
            login: loginRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        });
        loginRef.current.value='';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
        handlePanelChange()
    }

    const handlePanelChange = () => {
        history.push('/login')
    }

    return (
        <RegistrationPageWrapper>
                <br/>
                <br/>
                <label>name
                    <input ref={loginRef} type='text' defaultValue='Jane Doe'/>
                </label>
                <br/>
                <label>email
                    <input ref={emailRef} type='text' defaultValue='example@example.com'/>
                </label>
                <br/>
                <label>password
                    <input ref={passwordRef} type='password' defaultValue='secret'/>
                </label>
                <br/>
                <label>confirm password
                    <input ref={confirmPasswordRef} type='password' defaultValue='secret'/>
                </label>
                <br/>
                <button onClick={handleSubmit}>Register</button>
                <br/>
                <br/>
                <div>{message? message : null}</div>
                <button onClick={handlePanelChange}>{message === 'You have been successfully registered!' ? 'log in' : 'already registered? go back to logging panel'}</button>
        </RegistrationPageWrapper>
    )
}

export default RegistrationPanel