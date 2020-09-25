import axios from "axios";
import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Alert, Form, Button, Modal } from "react-bootstrap";
import atlas from "../../../icons/atlas.png"; 
import leaf  from "../../../icons/leaf.png";
//CSS
import "./Login.css";

const Login = (props) => {
  // State untuk modal
  const [show, setShowLogin] = useState(false);
  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);
  const [alertShow, setAlertShow] = useState({status:false, message:""});

  //handler login
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  // if( dataLoad ? <COMPONEN > : <h1>loading dulu</h1> )
  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5002/api/login", formLogin
      // {username: "example@gmail", password:"example"}
      )
      .then((res) => {
        // do good things
        const { id, email, token, admin } = res.data.data;
        localStorage.setItem('id', JSON.stringify(id));
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('admin', JSON.stringify(admin));
        props.setisLoggedIn(true);
      })
      .catch((err) => {
        if (err) {
          console.log(err.response);
          setAlertShow({stats:true, message:err.response.data.message})
        }
      });  
  };

  //onchange untuk form login
  const onChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };
  
  return (
    <React.Fragment>
      <Button
        variant="outline-light"
        onClick={handleShow}
        size="sm"
        className="login"
      >
        Login
      </Button>

      <Modal show={show} onHide={handleClose} className="modallogin">
      <img
          className="modal-atlas"
          src={atlas}
        />
        <img
          className="modal-leaf"
          src={leaf}
        />
        <Form onSubmit={(e) => loginHandler(e)}>
        <Alert show={alertShow.status} onClose={() => setAlertShow({status:false})} dismissible variant="danger" >{alertShow.message}</Alert>
          <Modal.Header className="modal-header text-center" style={{border:"0"}} closeButton>
            <Modal.Title className="modal-title w-100">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="email">Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="password">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            {/* <Form.Text className="text-muted">
              Don't have an account?{" "}
              <a href="#signup" onClick={(handleClose, SignUpShow)}>
                Sign up
              </a>
            </Form.Text> */}
          </Modal.Body>
          <Modal.Footer>
          <div className="col-md-12 text-center">
            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="login-btn"
              style={{width:"70%"}}
            >
              Login
            </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

     </React.Fragment>
  );
};

export default Login;
