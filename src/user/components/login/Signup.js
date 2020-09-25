import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Form, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form"; //form validation
import { useHistory } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message"; //form validation
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";


//assets
import atlas from "../../../icons/atlas.png"; 
import leaf  from "../../../icons/leaf.png";

//CSS
import "./signup.css";

const Signup = (props) => {
  const [signupShow, setShowSignup] = useState(false);
  const SignUpClose = () => setShowSignup(false);
  const SignUpShow = () => setShowSignup(true);
  const [alertShow, setAlertShow] = useState({status:false, message:""});
  let history = useHistory();

  const schema = yup.object().shape({
    fullname: yup.string().required("kolom wajib diisi"),
    email: yup.string().email('masukkan format email yang benar').required("kolom wajib diisi"),
    password: yup.string().required("kolom wajib diisi"),
    phone: yup.number('masukkan angka').required("kolom wajib diisi"),
    address: yup.string().required("kolom wajib diisi"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [formRegister, setFormRegister] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const registerHandler = (e) => {
    axios
      .post("http://localhost:5002/api/user", formRegister)
      .then((res) => {
        // do good things
        const { id, email, token, admin } = res.data.data;
        localStorage.setItem("id", JSON.stringify(id));
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("admin", JSON.stringify(admin));
        props.setisLoggedIn(true)
        history.push({
          pathname: "/",
        });
      })
      .catch((err) => {
        console.log('errornya ', err.response)
        if (err.response) {
          console.log(err.response);
          setAlertShow({stats:true, message:err.response.data.error.message})
        } else if (err.request) {
          console.log(err);
          setAlertShow({stats:true, message:"terjadi kesalahan dalam mengirim data, hubungi admin"})
        } else {
          console.log(err);
          setAlertShow({stats:true, message:"terjadi kesalahan, hubungi admin"})
        }
      });
  };

  //onchange untuk form register
  const onChange2 = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };
  return (
    <React.Fragment>
      <Button variant="secondary" onClick={SignUpShow} size="sm" className="signup-btn">
        Register
      </Button>
      <Modal show={signupShow} onHide={SignUpClose}>
      <img
          className="modal-atlas"
          src={atlas}
        />
        <img
          className="modal-leaf"
          src={leaf}
        />
        <Form onSubmit={handleSubmit(registerHandler)}>
        <Alert show={alertShow.status} onClose={() => setAlertShow({status:false})} dismissible variant="danger" >{alertShow.message}</Alert>
          <Modal.Header className="modal-header text-center" style={{border:"0"}} closeButton>
            <Modal.Title className="modal-title w-100">Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={(e) => onChange2(e)}
                name="fullname"
                ref={register}
              />
            </Form.Group>
            {errors.fullname && (
            <p style={{ color: "red" }}>{errors.fullname.message}</p>
          )}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => onChange2(e)}
                ref={register}
              />
            </Form.Group>
            {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => onChange2(e)}
                ref={register}
              />
            </Form.Group>
            {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone"
                name="phone"
                onChange={(e) => onChange2(e)}
                ref={register}
              />
            </Form.Group>
            {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
              as="textarea"    
              rows="3"
                placeholder="Address"
                name="address"
                onChange={(e) => onChange2(e)}
                ref={register}
              />
            </Form.Group>
            {errors.address && (
            <p style={{ color: "red" }}>{errors.address.message}</p>
          )}
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" size="sm" onClick={SignUpClose}>
              Close
            </Button> */}
            <div className="col-md-12 text-center">
            <Button
            variant="primary"
              size="sm"
              type="submit"
              className="signup-btn"
              style={{width:"100%"}}
            >
              Register
            </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
      <ErrorMessage
        errors={errors}
        name="multipleErrorInput"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
    </React.Fragment>
  );
};

export default Signup;
