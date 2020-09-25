import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ProfileIcon from "../../../icons/BuildingIcon.png";
import {
  Alert,
  Navbar,
  Nav,
  NavItem,
  Image,
  Dropdown,
  FormControl,
} from "react-bootstrap";

//CSS

const Picture = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // DROPDOWN NOT FINISHED

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  return (
    <React.Fragment>
      <span class="d-inline-block btn float-left">
        <Image style={{ maxWidth: "25px" }} src={ProfileIcon} />
      </span>
    </React.Fragment>
  );
};

export default Picture;
