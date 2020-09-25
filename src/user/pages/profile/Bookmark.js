import axios from "axios";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Link } from "react-router-dom";
import DWT from "../../../icons/DWT2.png";
import NameIcon from "../../../icons/name.png";
import PhoneIcon from "../../../icons/PhoneIcon.png";
import PlaceIcon from "../../../icons/place.png";
import PostIcon from "../../../icons/post.png";
import Photo from "../../../images/Photo.png";
import BookmarkIcon from "../../../icons/bookmark-icon.png";
import AltPhoto from "../../../images/AltPhoto.png";
import QRIcon from "../../../icons/qr-code.png";
import { Button, Row, Col, Image, Card } from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import { LinkContainer } from "react-router-bootstrap/lib/ReactRouterBootstrap";
import parse from "html-react-parser";

const Bookmark = () => {
  const [todos, setTodos] = useState([]);
  const [profilUser, setProfilUser] = useState({});
  const userId = JSON.parse(localStorage.getItem("id"));
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(Photo);

  const getTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const result = await axios.get(
        `http://localhost:5002/api/bookmark/${id}`
      );
      const resultData = result.data.data.bookmarkedData;
      setTodos(resultData);
    } catch (err) {
    }
  };

  const unmarkTrip = async (idTrip) => {
    const userId = localStorage.getItem("id");
    try {
      await axios.delete("http://localhost:5002/api/bookmark", {
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        data: {
          userId: userId,
          journeyId: idTrip,
        },
      });

      const setelahDelete = todos.filter((i) => i.journeyId !== idTrip);
      setTodos(setelahDelete);
    } catch (err) {}
  };
  const listTrips = todos.map((dataTrip) => {
    return (
      <Card style={{ width: "300px", margin: "25px" }}>
        {/* <a href={`/Bookmark/${dataTrip.id}`} class="badge badge-primary">Bookmark</a> */}
        <a>
          <img
            onClick={() => unmarkTrip(dataTrip.Tripx.id)}
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
        {/* <span onClick={() => markTrip(dataTrip.Tripx.id)} class="badge badge-primary">    </span> */}
        <Link
          to={{
            pathname: `/DetailTrip/${dataTrip.Tripx.id}`,
            propsTrip: { id: dataTrip.Tripx.id },
          }}
        >

          <Card.Img
            style={{minWidth:"100%", minHeight: "12rem", maxHeight: "12rem", align: "center" }}
            variant="top"
            src={`http://localhost:5002/uploads/${dataTrip.Tripx.image}`}
          />
        </Link>
        <Card.Body>
          <Card.Title style={{ fontSize: "medium" }}>
            <b>{dataTrip.Tripx.title.slice(0, 25) + "..."}</b>
            <div>
              <p style={{ fontSize: "50%" }}>{`${dataTrip.Tripx.createdAt}`.substring(0, 10)}, {dataTrip.Tripx.Userx.fullname}</p>
            </div>
          </Card.Title>
          <Card.Text>
            <p class="card-text float-left" style={{fontSize:"14px"}}>
            
              {dataTrip.Tripx.content.slice(0,125) + "..."}
              {parse(`${dataTrip.Tripx.description}`.slice(0,125) + "...")}
 
            </p>
            {/* <p style={{fontSize:'60%'}} class="card-text">SINGAPORE lies about one degree of latitude (137 kilometres or 85 miles) north of the equator, off the southern tip of the Malay Peninsula, bordering the Straits of Malacca to the west, the Riau Islands to the south, and the South China Sea to the east.</p> */}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });

  const getUser = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `http://localhost:5002/api/user/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const resultUser = result.data.data.detailUser;
      console.log("result dari query user  : ", resultUser);
      setProfilUser(resultUser);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
    getUser();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <div>
        <Container style={{minHeight:"510px"}}>
          <Row>
            <Container >
              <h1 style={{ textAlign: "center" }}>
                <b>BOOKMARK</b>
              </h1>
              <br />
            </Container>
          </Row>

          <Row></Row>

          {listTrips.country ? <h1>Loading...</h1> : <Row>{listTrips}</Row>}
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Bookmark;
