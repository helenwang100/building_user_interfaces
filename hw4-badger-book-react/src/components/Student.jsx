import { Col } from "react-bootstrap";

const Student = (props) => {
    
    let fromWI = "aren't";
    if (props.fromWisconsin) {
        fromWI = "are";
    }
    
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <h6><strong>Major: </strong>{props.major}</h6>
        <p>
            They {fromWI} from WI and are taking {props.numCredits} this semester.
        </p>
        <p><strong>Their interests: </strong></p>
        <ul>
            {props.interests.map(s => <Col key={s}>
                    <li>{s}</li> 
                </Col>
            )}
        </ul>


    </div>
}

export default Student;