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
import Login from "../../components/login/Login";
import Signup from "../../components/login/Signup";
import Picture from "./Picture";
import DWT from "../../../icons/DWT.png";
import LogoutIcon from "../../../icons/logout.png";
import UserIcon from "../../../icons/user.png";
import TripIcon from "../../../icons/trip.png";
import Profil from "../../../icons/user-2.png";
import BillIcon from "../../../icons/bill.png";
import { Link } from "react-router-dom";
const AdminIcon = () => {
  const logoutHandler = async (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.clear();
    window.location.reload(false);
  };

  return (
    <NavDropdown
      title={<Image src={UserIcon} width="30" height="30" />}
      roundedCircle
      id="basic-nav-dropdown"
      drop="left"
    >
    
      <NavDropdown.Item>
      <Link to="/IncomeTrip">
        <Nav>
          
            <Image style={{ width: "30px" }} src={TripIcon} fluid /> Trip

        </Nav>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logoutHandler}>
        <Link to="/">
          <Image style={{ width: "30px" }} src={LogoutIcon} fluid /> logout
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default AdminIcon;
