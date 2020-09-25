import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import parse from "html-react-parser";
import BuildingIcon from "../../../icons/BuildingIcon.png";
import CalendarIcon from "../../../icons/CalendarIcon.png";
import TimeIcon from "../../../icons/TimeIcon.png";
import MealIcon from "../../../icons/MealIcon.png";
import PlaneIcon from "../../../icons/PlaneIcon.png";
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
  Image,
} from "react-bootstrap";
import "./detailtrip.css";

const Home = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [dataTrip, setdataTrip] = useState({});
  const [form, setForm] = useState({});

  const getTrip = async () => {
    try {
      const result = await axios.get(`http://localhost:5002/api/trip/${id}`);
      const { detailTrip } = result.data.data;
      setdataTrip(detailTrip);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrip();
  }, []);

  useEffect(() => {
    if (form.total) {
      axios.post("http://localhost:5001/api/transaction", form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      history.push({
        pathname: "/Payment",
        state: { userId: dataTrip.user_id },
      });
    }
  }, [form]);

  useEffect(() => {
    if (dataTrip.ImageTrip && dataTrip.ImageTrip.id) {
    }
  }, [dataTrip]);
  if (dataTrip.Userx && dataTrip) {
    return (
      <React.Fragment>
        <Container>
          <div className="d-flex justify-content-between">
            <p className="trip-detail-title">{dataTrip.title}</p>
            {/* <p className="trip-detail-writer" style={{ marginBlock: "auto" }}>
              {dataTrip.Userx.fullname}{" "}
            </p> */}
          </div>
          <div className="d-flex justify-content-between">
            <p className="trip-detail-date">
              {`${dataTrip.createdAt}`.substring(0, 10)}
            </p>
            <p className="trip-detail-writer" style={{textAlign:"right"}}>
              by: {dataTrip.Userx.fullname}
            </p>
          </div>
          <hr/>
          {/* <div className="trip-detail-date">
            {`${dataTrip.createdAt}`.substring(0, 10)}
            <br />
          </div> */}
          <br />
          <Container>
            <CardGroup>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5002/uploads/${dataTrip.image}`}
                  style={{ maxWidth: "1260px", maxHeight: "691px" }}
                />
                <Card.Body>
                  <Card.Text>{parse(`${dataTrip.description}`)}</Card.Text>
                </Card.Body>
              </Card>{" "}
            </CardGroup>
          </Container>
        </Container>
      </React.Fragment>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default Home;
