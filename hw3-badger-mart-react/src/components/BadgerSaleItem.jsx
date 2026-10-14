import { useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function BadgerSaleItem(props) {
    
    const [quantity, setQuantity] = useState(0);

    return <Card bg={props.featured ? "warning" : "info"}>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <p>${props.price}</p>
        <div>
            <Button 
                className="inline"
                class={props.featured ? "btn btn-danger" : "btn btn-primary"}
                disabled = {quantity <= 0 ? true :  false}
                onClick={() => setQuantity(quantity - 1)}
            >-</Button>
            <p className="inline">{quantity}</p>
            <Button 
                className="inline"
                class={props.featured ? "btn btn-danger" : "btn btn-primary"}
                onClick={() => setQuantity(quantity + 1)}
            >+</Button>
        </div>
    </Card>
}