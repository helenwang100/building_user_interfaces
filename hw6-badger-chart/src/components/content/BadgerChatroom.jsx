import React, { useEffect, useRef, useState, useContext } from "react";
import { Form, Row, Col, Pagination, Button } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [activePage, setActivePage] = useState(false);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const postTitleRef = useRef();
    const postContentRef = useRef();

    const loadMessages = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=1`, {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
        }).then(res => res.json()).then(json => {
            setActivePage(1);
            setMessages(json.messages);
            //console.log(messages)
        })
    };

    const buildPaginator = () => {
        let pages = [];
        for (let i = 1; i <= 4; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={activePage === i}
                    onClick={() => setActivePage(i)}
                >{i}</Pagination.Item>
            )
        }
        return pages;
    }

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);

    function post(e) {
        e?.preventDefault();
        fetch('https://cs571.org/api/s24/hw6/messages?chatroom=' + props.name, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: postTitleRef.current.value,
                content: postContentRef.current.value
            })

        })
            .then(res => {
                if (res.status === 200) {
                    alert("Successfully posted!");
                    loadMessages();
                }
            })
    }

    function isTitleAndContentExists(e) {
        e?.preventDefault();
        if (!postTitleRef.current.value || !postContentRef.current.value) {
            alert("You must provide both a title and content!");
            return;
        }
        post();
    }

    function deletePost(id) {
        fetch("https://cs571.org/api/s24/hw6/messages?id=" + id, {
            method: "DELETE",
            credentials: "include"
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully deleted the post!");
                loadMessages();
            }

        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            loginStatus === "no" ?
                <h3>You must be logged in to post!</h3>
                : <Form>
                    <Form.Label htmlFor="makePostTitleInput">Post Title:</Form.Label>
                    <Form.Control
                        id="postTitleInput"
                        ref={postTitleRef}
                    ></Form.Control>
                    <Form.Label htmlFor="makePostContentInput">Post Content:</Form.Label>
                    <Form.Control
                        id="postContentInput"
                        ref={postContentRef}
                    ></Form.Control>
                    <br />
                    <Button type="submit" onClick={e => isTitleAndContentExists(e)}>Create Post</Button>
                </Form>
            /* TODO: Allow an authenticated user to create a post. */
        }
        <hr />
        <Row>
            {
                messages.slice((activePage - 1) * 25, activePage * 25).length > 0 ?
                    messages.slice((activePage - 1) * 25, activePage * 25).map(m => {
                        return <Col xs={6} md={4} lg={3} xxl={2} key={m.id}>
                            <>
                                <BadgerMessage
                                    {...m}
                                    hasDeleteButton={m.poster === sessionStorage.getItem("login")}
                                    onDelete={() => deletePost(m.id)} // from ChatGPT
                                />
                            </>
                        </Col>
                    })
                    : <p>There are no messages on this page yet!</p>
            }
        </Row>
        <Pagination>{buildPaginator()}</Pagination>
    </>
}
