import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
    const [allStudents, setAllStudents] = useState([]);
    const [copyStudents, setCopyStudents] = useState([]);
    const [students, setStudents] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputMajor, setInputMajor] = useState('');
    const [inputInterest, setInputInterest] = useState('');
    const [activePage, setActivePage] = useState(false);

    function resetSearch() {
        setInputName('');
        setInputMajor('');
        setInputInterest('');
        setActivePage(1);
    }

    const buildPaginator = () => {
        let pages = [];
        const num_pages = Math.ceil(students.length / 24);
        for(let i = 1; i <= num_pages; i++) {
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

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => {
                console.log(res.status);
                return res.json();
            })
            .then(data => {
                console.log(data);
                setAllStudents(data);
                setCopyStudents(data);
                setStudents(data);
            })
    }, [])

    useEffect(() => {
        let completelyFiltered = [];
        const halfFiltered = allStudents.filter(s =>
            (s.name.first + " " + s.name.last).trim().toLowerCase().includes(inputName) &&
            s.major.toLowerCase().includes(inputMajor));
        for (let s of halfFiltered) {
            for (let interest of s.interests) {
                if (interest.toLowerCase().trim().includes(inputInterest.toLowerCase().trim())) {
                    completelyFiltered.push(s);
                    break;
                }
            }
        }
        setActivePage(1);
        setAllStudents(copyStudents);
        setStudents(completelyFiltered);
    }, [inputName, inputMajor, inputInterest]);

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control
                id="searchName"
                value={inputName}
                onChange={e => 
                    setInputName(e.target.value)
                }
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control
                id="searchMajor"
                value={inputMajor}
                onChange={e => 
                    setInputMajor(e.target.value)
                }
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control
                id="searchInterest"
                value={inputInterest}
                onChange={e => 
                    setInputInterest(e.target.value)
                }
            />
            <br />
            <Button
                variant="neutral"
                onClick={resetSearch}
            >Reset Search</Button>

        </Form>
        <p>There are {students.length} student(s) matching your search.</p>
        <Container fluid>
            <Row>
                {
                    students
                        .slice((activePage - 1) * 24, activePage * 24)
                        .map(s =>
                        <Col key={s.id} xs={12} md={6} lg={4}>
                            <Student {...s} />
                        </Col>)
                }
            </Row>
        </Container>
        <Pagination>
            <Pagination.Item 
                key="Previous" 
                disabled={activePage === 1 || students.length === 0 ? true : false}
                onClick={() => setActivePage(i => i - 1)}
            >Previous</Pagination.Item>
            {buildPaginator()}
            <Pagination.Item 
                key="Next" 
                disabled={activePage === Math.ceil(students.length / 24) || students.length === 0 ? true : false}
                onClick={() => setActivePage(i => i + 1)}
            >Next</Pagination.Item>
        </Pagination>
    </div>

}
export default Classroom;
