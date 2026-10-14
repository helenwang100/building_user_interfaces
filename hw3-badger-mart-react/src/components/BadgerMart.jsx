import { useEffect, useState } from "react"
import BadgerSaleItem from "./BadgerSaleItem";
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerMart(props) {

    const [saleItems, setSaleItems] = useState([]);
    const [featureItem, setFeatureItem] = useState("Loading...");

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw3/all-sale-items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSaleItems(data);
            })
    }, [])

    // get featured item
    fetch("https://cs571.org/api/s24/hw3/featured-sale-item", {
        headers: {
            "X-CS571-ID": CS571.getBadgerId()
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setFeatureItem("Today's featured item is " + data.name + " for $" + data.price + "!");  
    })

    return <div style={{color:"midnightblue"}}>
        <h1><strong>Badger Mart</strong></h1>
        <p>Welcome to our small-town mini mart located in Madison, WI!</p>
        <p>{featureItem}</p>
        <Container>
            <Row>
                {
                    saleItems.map(saleItem => {
                        return <Col key={saleItem.name} xs={12} md={6} lg={4} xl={3}>
                            <BadgerSaleItem
                                name={saleItem.name}
                                description={saleItem.description}
                                price={saleItem.price}
                                featured={saleItem.featured}
                            />
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}