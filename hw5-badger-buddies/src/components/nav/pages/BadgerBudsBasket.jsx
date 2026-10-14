import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

export default function BadgerBudsBasket(props) {
    // next 2 lines copied from BadgerBudsAdoptable, so from ChatGPT
    const [savedCats, setSavedCats] = useState(() => sessionStorage.getItem("savedCats"));
    const [cats, setCats] = useState(savedCats ? JSON.parse(sessionStorage.getItem("savedCats")) : []);
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        setEmpty(!savedCats || JSON.parse(savedCats).length === 0);
    }, [cats])

    function adoptCat(cat) {
        const adopted = cats.filter(c => c.id !== cat.id);
        setCats(adopted);
        sessionStorage.setItem("savedCats", JSON.stringify(adopted));
        setSavedCats(JSON.stringify(adopted));
        alert(cat.name + " has been adopted!");
    }

    function unselectCat(cat) {
        let forUnsaved = JSON.parse(sessionStorage.getItem("unsaved"));
        forUnsaved.push(cat);
        sessionStorage.setItem("unsaved", JSON.stringify(forUnsaved));
        const forSaved = cats.filter(c => c.id !== cat.id);
        setCats(forSaved);
        sessionStorage.setItem("savedCats", JSON.stringify(forSaved));
        setSavedCats(JSON.stringify(forSaved));
        alert(cat.name + " has been removed from your basket!");
    }

    return <div>
        <h1>Badger Buds Basket</h1>
        {empty ? <p>You have no buds in your basket!</p> : <p>These cute cats could be all yours!</p>}
        <Row>
            {cats.map(c => {
                const catImg = "https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/" + c.imgIds[0];
                const catImgAlt = "image of " + c.name;

                return <Col xs={6} md={4} lg={3} xxl={2} key={c.id}>
                    <Card>
                        <h3>{c.name}</h3>
                        <img style={{ aspectRatio: "1/1" }} src={catImg} alt={catImgAlt}></img>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => unselectCat(c)}
                        >Unselect</Button>
                        <Button
                            variant="success"
                            size="sm"
                            onClick={() => adoptCat(c)}
                        >Adopt</Button>
                    </Card>
                </Col>
            })}
        </Row>
    </div>
}
