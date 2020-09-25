import axios from "axios";
import React,  { useState, useEffect }  from "react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
// import DestImg from "../../../images/Dest-Melbourne-1.png";
import DestImg from "../../../images/Dest-Melbourne-1.png";
import Icons from "../../../icons/BuildingIcon.png";
import MinusIcon from "../../../icons/Minus.png";
import PlusIcon from "../../../icons/Plus.png";
import Container from "react-bootstrap/Container";
import {
  Button,
  CardGroup,
  Card,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const getTodos =  async () => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTk3Mjk1NTk0fQ.Xy4EyfPPEG1yRQza30Eieyhp1lI5ZejnZv0A16GaCPg";
    const result = await axios({
      method: "GET",
      url: "http://localhost:5001/api/trips",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resultData = result.data.data.trips;
    setTodos(resultData);
  };

  const listTrips = todos.map((dataTrip) => (
    <Card style={{ width: "18rem", margin: "35px" }}>
            <Link to={{
              pathname:`/DetailTrip/${dataTrip.id}`, propsTrip:{id: dataTrip.id} }}   >
              <Card.Img
                style={{ padding: "10px", align: "center" }}
                variant="top"
                // src={"https://i.ibb.co/0M9Wbyf/Aust-Thmb-1.png"}
                src={dataTrip.image}
                
              />
            </Link>
            <Card.Body>
              <Card.Title style={{ fontSize: "medium" }}>
                <b>{ dataTrip.title.slice(0, 25)+'...'}</b>
              </Card.Title>
              <Card.Text>
                <p
                  class="card-text float-left"
                  style={{ color: "orange", fontWeight: "bold" }}
                >
                  IDR.{` ${(dataTrip.price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`} 
                </p>
                <p class="card-text float-right">{dataTrip.country}</p>
              </Card.Text>
            </Card.Body>
          </Card>
  ));

  useEffect(() => {
    getTodos();
  }, []);

return (
  <React.Fragment>
    <Container className="p-3" style={{ minHeight: "50rem" }}>
      <Container>
        <Row>
          <Col style={{ textAlign: "left" }}>
            <h1>Incoming Trip</h1>
          </Col>
          <Col style={{ textAlign: "right" }}>
            {" "}
            <Link to="/AddTrip">
              <Button
                variant="warning"
                style={{ backgroundColor: "#FFAF00" }}
                size="sm"
              >
                Add Trip
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Row>
      {listTrips}
       </Row>
    </Container>
  </React.Fragment>
);
}
export default Home;
