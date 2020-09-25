import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Image,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap/";
import LogoutIcon from "../../../icons/logout.png";
import Profil from "../../../icons/user-2.png";
import NewJourneyIcon from "../../../icons/write-icon.png";
import BookmarkIcon from "../../../icons/bookmark-icon.png";
import { Link, useHistory } from "react-router-dom";
import "./navbar.css"
const ProfileIcon = (props) => {
  const [profilUser, setProfilUser] = useState({});
  let history = useHistory();

  
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.clear();
    props.setisLoggedIn(false)
    history.push({
      pathname: "/",
    });
  };

  const getUser = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("id"));
      const result = await axios({
        method: "GET",
        url: `http://localhost:5002/api/user/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const resultTransactions = result.data.data.detailUser;
      setProfilUser(resultTransactions);
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  getUser();
}, []);

  return (
    <NavDropdown
      title={<Image className="profile-icon" roundedCircle src={`http://localhost:5002/uploads/profile_picture/${profilUser.picture}#${Date.now()}`} width="30" height="30" />}
      drop="left"
    >
      <NavDropdown.Item>
      <Link to="/Profile">
        <Nav>
            <Image style={{ width: "30px" }} src={Profil} fluid /> Profile
        </Nav>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Nav>
          <Link to="/AddTrip">
            <Image style={{ width: "30px" }} src={NewJourneyIcon} fluid /> New Journey
          </Link>
        </Nav>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Nav>
          <Link to="/Bookmark">
            <Image style={{ width: "30px" }} src={BookmarkIcon} fluid /> Bookmark
          </Link>
        </Nav>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logoutHandler}>
        <Image style={{ width: "30px" }} src={LogoutIcon} fluid /> logout
      </NavDropdown.Item>
      
    </NavDropdown>
  );
};

export default ProfileIcon;
