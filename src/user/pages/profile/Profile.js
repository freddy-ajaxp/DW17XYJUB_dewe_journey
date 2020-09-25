import axios from "axios";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Photo from "../../../images/Photo.png";
import AltPhoto from "../../../images/AltPhoto.png";
import {Alert, Button, Row, Col, Image, Card } from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import { LinkContainer } from "react-router-bootstrap/lib/ReactRouterBootstrap";
import BookmarkIcon from "../../../icons/bookmark-icon.png";
import "./profile.css";
import parse from "html-react-parser";
import Navbar from "../../components/navbar/Navbar";

const Profile = (props) => {
  const [todos, setTodos] = useState([]);
  const [profilUser, setProfilUser] = useState({});
  const userId = JSON.parse(localStorage.getItem("id"));
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(Photo);
  const [alertShow, setAlertShow] = useState({status:false, message:"terjadi kesalahan"});
  // untuk trigger refresh pas ganti foto
  const [uploadRefresh, setUploadRefresh ] = useState(false);
  const trigger = () => {
    uploadRefresh? setUploadRefresh(false) : setUploadRefresh(true)
  }

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setPicture(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    const idUser = localStorage.getItem("id");
    const formData = new FormData();
    formData.append("idUser", idUser);
    formData.append("profile", picture);
    axios
    .patch(`http://localhost:5002/api/user/${idUser}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    .then(()=>{
      // props.setUploadRefresh(true); // ini dikomen karena ini untuk trigger ke private/atasnya
      trigger()
    })
    .catch((err) => {
      if (err.response?.data?.message) {
        setAlertShow({stats:true, message:err.response.data.message})
      } else {
        console.log("error dari axios", err);
        setAlertShow({stats:true, message:"terjadi kegagalan dalam upload gambar, refresh atau hubungi Administrator"})
      }
    });
  };
  
  const getTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const result = await axios.get(`http://localhost:5002/api/trips/${id}`);
      const resultData = result.data.data.trips;
      setTodos(resultData);
    } catch (err) {
      console.log("terjadi error: ", err);
    }
  };

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
      setProfilUser(resultUser);
      setImgData(`http://localhost:5002/uploads/profile_picture/${result.data.data.detailUser.picture}#${Date.now()}`);
    } catch (err) {
      console.log(err);
      setAlertShow({stats:true, message:"terjadi kegagalan dalam mengambil data, refresh atau hubungi Administrator"})

    }
  };

  const listTrips = todos.map((dataTrip) => {
    return (
      <Card style={{ width: "300px", margin: "25px" }}>
        {/* <a href={`/Bookmark/${dataTrip.id}`} class="badge badge-primary">Bookmark</a> */}
        <a>
          <img
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
            style={{minWidth:"100%", minHeight: "12rem", maxHeight: "12rem", align: "center" }}
            variant="top"
            src={`http://localhost:5002/uploads/${dataTrip.image}#${Date.now()}`}
          />
        </Link>
        <Card.Body>
          <Card.Title style={{ fontSize: "medium" }}>
            <b>{dataTrip.title.slice(0, 25) + "..."}</b>
            <div>
              <p style={{ fontSize: "50%" }}>{`${dataTrip.createdAt}`.substring(0, 10)}, {dataTrip.Userx.fullname}</p>
            </div>
          </Card.Title>
          <Card.Text>
            <p class="card-text float-left" style={{fontSize:"14px"}}>
            {/* {dataTrip.content.slice(0,125) + "..."} */}
            {parse(`${dataTrip.description}`.slice(0,125) + "...")}
 
            </p>
            {/* <p style={{fontSize:'60%'}} class="card-text">SINGAPORE lies about one degree of latitude (137 kilometres or 85 miles) north of the equator, off the southern tip of the Malay Peninsula, bordering the Straits of Malacca to the west, the Riau Islands to the south, and the South China Sea to the east.</p> */}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });

  
  useEffect(() => {
    // getTransactions();
    getTodos();
    getUser();
    return () => {};
  }, []);

  useEffect(() => {
    if (picture) {
      uploadImage();
    }
  }, [picture]);
  const profileSection = () => {
    return (
      <>
      <Alert show={alertShow.status} onClose={() => setAlertShow({status:false})} dismissible variant="danger" >{alertShow.message}</Alert>
        <Container style={{ textAlign: "center" }}>
          <div>
            <Image
              style={{ width: "200px", height: "200px", align: "center" }}
              // src={imgData}
              src={`http://localhost:5002/uploads/profile_picture/${profilUser.picture}#${Date.now()}`}
              roundedCircle
            />
          </div>
          <br />
          <div className="profile-name">
            {" "}
            {profilUser.fullname}
            
          </div>
          <div className="profile-mail">
          {profilUser.email}
          </div>
          <div class="form-group">
                <input type="file" name="image" onChange={onChangePicture} />
              </div>
          <br></br>
        </Container>
      </>
    );
  };

  

  return (
    <React.Fragment>
    <Navbar backgroundImgTrue={true} trigger={trigger}/>
      <div>
        <Container>
          <Row>
            <Container>
            <br/>
              <h1 style={{ textAlign: "left" }}>
                <b>PROFILE</b>
              </h1>
              <br />
            </Container>
          </Row>
          {profileSection()}

          <Row></Row>

          {listTrips.Userx ? <h1>Loading...</h1> : <Row>{listTrips}</Row>}
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Profile;
