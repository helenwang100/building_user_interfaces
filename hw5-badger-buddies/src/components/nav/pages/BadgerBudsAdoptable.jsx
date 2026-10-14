import { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Button, Carousel } from "react-bootstrap";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsAdoptable(props) {
    const data = useContext(BadgerBudsDataContext);

    const [showMore, setShowMore] = useState("Show More");
    const [pressedShowMore, setPressedShowMore] = useState(false);
    const [unsavedCats, setUnsavedCats] = useState(() => sessionStorage.getItem("unsaved")); // from ChatGPT
    const [cats, setCats] = useState(unsavedCats ? JSON.parse(unsavedCats) : data);
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        //console.log(JSON.parse(unsavedCats).length);
        setEmpty(!unsavedCats || JSON.parse(unsavedCats).length === 0);
    }, [unsavedCats]);

    useEffect(() => {
        setCats(unsavedCats ? JSON.parse(unsavedCats) : data);
    }, [unsavedCats, data]);

    function moveCat(cat) {
        const temp = cats.filter(c => c.id !== cat.id);
        setCats(temp);
        sessionStorage.setItem("unsaved", JSON.stringify(temp));
        setUnsavedCats(sessionStorage.getItem("unsaved"));
        //setEmpty(unsavedCats || JSON.parse(unsavedCats).length > 0 ? false : true);
        alert(cat.name + " has been added to your basket!");

        const savedCats = sessionStorage.getItem("savedCats");
        const updatedSavedCats = JSON.stringify([...(savedCats ? JSON.parse(savedCats) : []), cat]); // from ChatGPT
        sessionStorage.setItem("savedCats", updatedSavedCats);
    }

    useEffect(() => {
        setShowMore(pressedShowMore ? "Show Less" : "Show More");
    }, [pressedShowMore]);

    return (
        <div>
            <h1>Available Badger Buds</h1>
            {empty ? <p>No buds are available for adoption!</p> : <p>The following cats are looking for a loving home! Could you help?</p>}
            <Row>
                {cats.map(c => {
                    const catImg = "https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/" + c.imgIds[0];
                    const catImgAlt = "image of " + c.name;

                    return <Col xs={6} md={4} lg={3} xxl={2} key={c.id}>
                        <Card>
                            <h3 style={{ paddingTop: "10px", paddingBottom: "4px", textAlign: "center" }}>{c.name}</h3>
                            {pressedShowMore ? (
                                <Carousel>
                                    {c.imgIds.map(img => {
                                        let catImgID = "https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/" + img;
                                        let catImgAlts = "image of " + c.name + " with id of " + img;
                                        return <Carousel.Item key={img}>
                                            <img style={{ aspectRatio: "1/1" }} src={catImgID} alt={catImgAlts} />
                                        </Carousel.Item>
                                    })

                                    }
                                </Carousel>
                            ) : (<img style={{ aspectRatio: "1/1" }} src={catImg} alt={catImgAlt} />)}
                            {pressedShowMore ? (
                                <Card>
                                    <div style={{ paddingTop: "10px", paddingRight: "10px", paddingLeft: "10px" }}>
                                        <p padding-right="25px"><strong>Breed: </strong>{c.breed}</p>
                                        <p><strong>Gender: </strong>{c.gender}</p>
                                        <p><strong>Age: </strong>{c.age}</p>
                                        <p>{c.description || ""}</p>
                                    </div>
                                </Card>
                            ) : null}
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setPressedShowMore(p => !p)}
                            >{showMore}</Button>
                            <Button
                                variant="success"
                                size="sm"
                                onClick={() => moveCat(c)}
                            >Save</Button>
                        </Card>
                    </Col>
                })}
            </Row>
        </div>
    );
}