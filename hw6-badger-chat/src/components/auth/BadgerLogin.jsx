import React, { useRef, useEffect, useState, useContext } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    // TODO Create the login component.

    function handleLogin(e) {
        e?.preventDefault();
        fetch(`https://cs571.org/api/s24/hw6/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        })
        .then(res => {
            if (res.status === 401) {
                alert("Incorrect username or password!");
            } else {
                alert("Login was successful");
                setLoginStatus(usernameRef.current.value);
                navigate("/")
            }
        })
    }

    useEffect(() => {
        sessionStorage.setItem("login", loginStatus);
    }, [loginStatus])

    function isPassAndUserExists(e) {
        e?.preventDefault();
        if (!usernameRef.current.value || !passwordRef.current.value) {
            alert("You must provide both a username and password!");
            return;
        }
        handleLogin();
    }

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control
                id="usernameInput" 
                ref={usernameRef}
            ></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control 
                id="passwordInput" 
                type="password"
                ref={passwordRef}
            ></Form.Control>
            <br/>
            <Button type="submit" onClick={e => isPassAndUserExists(e)}>Login</Button>
        </Form>
    </>
}
