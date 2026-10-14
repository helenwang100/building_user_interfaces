import React, { useContext } from "react"
import { Card, Button } from "react-bootstrap";
import BadgerChatroom from "./BadgerChatroom";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    //console.log(props);

    function handleDelete(){
        props.onDelete(props.id);
    }

    return <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br />
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.hasDeleteButton ? 
            <Button 
                variant="danger" 
                size="sm"
                onClick={handleDelete}
            >Delete Post</Button>
        : null }
    </Card>
}

export default BadgerMessage;