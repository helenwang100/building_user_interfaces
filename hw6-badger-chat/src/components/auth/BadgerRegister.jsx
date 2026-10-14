import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

export default function BadgerRegister() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    // TODO Create the register component.
    function handleRegister(e) {
        e?.preventDefault();
        fetch(`https://cs571.org/api/s24/hw6/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            console.log(res);
            if (res.status === 409) {
                alert("That username has already been taken!");
            } else {
                alert("Registration was successful");
            }
        })
    }

    function isPassAndUserValid(e) {
        e?.preventDefault();
        if (!username || !password) {
            alert("You must provide both a username and password!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Your passwords do not match!");
            return;
        }
        handleRegister();
    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control
                id="usernameInput" 
                onChange={e => setUsername(e.target.value)}
            ></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control 
                id="passwordInput" 
                type="password"
                onChange={e => setPassword(e.target.value)}
            ></Form.Control>
            <Form.Label htmlFor="confirmPasswordInput">Confirm Password</Form.Label>
            <Form.Control
                id="confirmPasswordInput" 
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
            <br/>
            <Button type="submit" onClick={e => isPassAndUserValid(e)}>Register</Button>
        </Form>
    </>
}
