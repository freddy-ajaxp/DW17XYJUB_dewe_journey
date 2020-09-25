import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import parse from "html-react-parser";
import BookmarkIcon from "../../../icons/bookmark-icon.png";
import Navbar from "../../../user/components/navbar/Navbar";
import Search from "../../components/search/Search";
import "./home.css";

//START
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  
  const onChangeMonth = async (e) => {
    // console.log(e.target.value)
    const bulan = e.target.value;
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(`http://localhost:5002/api/trips/getbyMonth/${bulan}`);
      const resultData = result.data.data.trips;
      setTodos(resultData);
    } catch (err) {
      console.log("error message:", err);
    }
  };

  const getTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:5002/api/trips");
      const resultData = result.data.data.trips;
      setTodos(resultData);
    } catch (err) {
      console.log("error message:", err);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get("http://localhost:5002/api/search", {
        params: {
          keyword,
        },
      });
      const resultData = result.data.data.trips;
      setTodos(resultData);
    } catch (err) {}
  };

  const markTrip = async (tripId) => {
    const userId = localStorage.getItem("id");
    try {
      await axios.post(
        "http://localhost:5002/api/bookmark",
        { userId: userId, journeyId: tripId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      history.push("/Bookmark");
    } catch (err) {
      console.log("error message", err);
    }
  };

  const listTrips = todos.map((dataTrip) => {
    return (
      <Card style={{ width: "300px", margin: "25px" }}>
        {/* <a href={`/Bookmark/${dataTrip.id}`} class="badge badge-primary">Bookmark</a> */}
        <a>
          <img
            onClick={() => markTrip(dataTrip.id)}
            style={{
              maxWidth: "25px",
              marginLeft: "16rem",
              marginTop: "10px",
              position: "absolute",
            }}
            src={BookmarkIcon}
            alt="custom-magnifier"
          />
        </a>

        <Link
          to={{
            pathname: `/DetailTrip/${dataTrip.id}`,
            propsTrip: { id: dataTrip.id },
          }}
        >
          <Card.Img
            style={{
              minWidth: "100%",
              minHeight: "12rem",
              maxHeight: "12rem",
              align: "center",
            }}
            variant="top"
            src={`http://localhost:5002/uploads/${dataTrip.image}`}
          />
        </Link>
        <Card.Body>
          <Card.Title style={{ fontSize: "medium" }}>
            <b>{dataTrip.title.slice(0, 25) + "..."}</b>
            <div>
              <p style={{ fontSize: "50%" }}>
                {`${dataTrip.createdAt}`.substring(0, 10)},{" "}
                {dataTrip.Userx.fullname}
              </p>
            </div>
          </Card.Title>
          <Card.Text>
            <p class="card-text float-left" style={{ fontSize: "14px" }}>
              {/* {dataTrip.content.slice(0,125) + "..."} */}
              {parse(`${dataTrip.description}`.slice(0, 125) + "...")}
            </p>
            {/* <p style={{fontSize:'60%'}} class="card-text">SINGAPORE lies about one degree of latitude (137 kilometres or 85 miles) north of the equator, off the southern tip of the Malay Peninsula, bordering the Straits of Malacca to the west, the Riau Islands to the south, and the South China Sea to the east.</p> */}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <React.Fragment>
      <div className="jumbotron-container">
        <Navbar backgroundImgTrue={false}></Navbar>
        <Jumbotron
          style={{
            background: "rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="outer">
            <div className="home-header">
              <div className="home-header-title">
                The Journey <br />
                You Ever Dreamed Of
              </div>
              
              <div className="home-header-subtitle">
                We made a tool so you can easily keep & share your travel
                memories.
                <br />
                But there is a lot more{" "}
              </div>
            </div>
          </div>
        </Jumbotron>
      </div>

      <Container style={{ minHeight: "480px" }}>
        <Row>
          <Container>
            <h1 style={{ textAlign: "left" }}>
              <b>Journey</b>
            </h1>
            <br />
            
            <Form onSubmit={(e) => searchHandler(e)}>
              <InputGroup style={{maxWidth: "100%" }}>
                <FormControl
                  type="text"
                  placeholder="Find Journey "
                  aria-label="Input group example"
                  aria-describedby="btnGroupAddon2"
                  name="keyword"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button type="submit" variant="primary">Search</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <Col xs='12' md='3'>
            {/* <Form onSubmit={(e) => searchHandler(e)}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Sort</Form.Label>
              <Form.Control as="select"
              name="month"
              onChange={(e) =>
               onChangeMonth(e)
              //  console.log('changed')
               }
              >
                <option value={0} disabled>
                  {" "}
                  --Pilih--
                </option>
                <option value="01" name="month">Jan</option>
                <option value="02" name="month">Feb</option>
                <option value="03" name="month">Mar</option>
                <option value="04" name="month">Apr</option>
                <option value="05" name="month">Mei</option>
                <option value="06" name="month">Jun</option>
                <option value="07" name="month">Jul</option>
                <option value="08" name="month">Agu</option>
                <option value="09" name="month">Sep</option>
                <option value="10" name="month">Okt</option>
                <option value="11" name="month">Nov</option>
                <option value="12" name="month">Des</option>

              </Form.Control>
            </Form.Group>
            </Form>
             */}
            </Col>
          </Container>
        </Row>

        <Row></Row>

        {listTrips.country ? <h1>Loading...</h1> : <Row>{listTrips}</Row>}
      </Container>
    </React.Fragment>
  );
};

export default Home;
