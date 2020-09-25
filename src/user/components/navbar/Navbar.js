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
import ProfileIcon from "./ProfileIcon";
import AdminIcon from "./AdminIcon";
import Signup from "../../components/login/Signup";
import DWT from "../../../icons/The-Journey-icon.png";
import DWT2 from "../../../icons/The-Journey-icon-2.png";
import { Link } from "react-router-dom";
import JumbImg from "../../../images/Jumbotron.png";
import "./navbar.css"

// import JumbImg from "../../../images/Jumbotron.png";
const NavUser = (props) => {
  const { backgroundImgTrue } = props;
  const [isLoggedIn, setisLoggedIn] = useState();
  const [triggerReload, setTriggerReload ] = useState(props);
  const cekLoggedIn = () => {
    if (localStorage.getItem("token")) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  };
  useEffect(() => {
    cekLoggedIn();
  }, []);
  return (
    <Navbar
      className="navbar-container"
      style={
        backgroundImgTrue
          ? { 
              backgroundImage: ` `,
              backgroundColor: "#F1F1F1",
              boxShadow: "0px 4px 36px rgba(0, 0, 0, 0.25)",
            }
          : {
              backgroundImage: ``,

            }
      }
    >
      <Navbar.Brand>
        <Link to={{ pathname: `/` }}>
          <Image
            className="logo"
            style={{ width: "139.46px", height:"46.14px" }}
            src={backgroundImgTrue ? DWT2 : DWT}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {!localStorage.getItem("token") && (
          <>
            {" "}
            <Login setisLoggedIn={setisLoggedIn}/>
            <Signup setisLoggedIn={setisLoggedIn}/>{" "}
          </>
        )}
        {localStorage.getItem("token") && <ProfileIcon setisLoggedIn={setisLoggedIn}/>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavUser;
