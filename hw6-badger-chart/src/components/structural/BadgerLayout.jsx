import React, { useState, useContext, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import BadgerLogin from "../auth/BadgerLogin";
import BadgerLogout from "../auth/BadgerLogout";
import BadgerMessage from "../content/BadgerMessage";

function BadgerLayout(props) {

    // TODO @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.

    const savedLoginStatus = sessionStorage.getItem("login");
    const [loginStatus, setLoginStatus] = useState(savedLoginStatus ? savedLoginStatus : "no");
    <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
        <BadgerLogin />
        <BadgerLogout />
        <BadgerMessage />
    </BadgerLoginStatusContext.Provider>
    sessionStorage.setItem("login", loginStatus);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {sessionStorage.getItem("login") === "no" ? <>
                            <Nav.Link as={Link} to="login">Login</Nav.Link>
                            <Nav.Link as={Link} to="register">Register</Nav.Link>
                            </>
                        : <Nav.Link as={Link} to="logout">Logout</Nav.Link> }

                        <NavDropdown title="Chatrooms">
                            {
                                props.chatrooms.map(chatroom => {
                                    return <NavDropdown.Item key={chatroom} as={Link} to={`chatrooms/${chatroom}`}>{chatroom}</NavDropdown.Item>
                                })
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;