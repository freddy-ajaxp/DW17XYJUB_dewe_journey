import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import DWT from "../../../icons/DWT2.png";
import BuktiPembayaranImg from "../../../images/bukti.png";
import { Button, Row, Col, Modal, Image } from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import { LinkContainer } from "react-router-bootstrap/lib/ReactRouterBootstrap";
import "./payment.css";

const PaymentPending = () => {
  const [transaction, setTransaction] = useState({});
  const [profilUser, setProfilUser] = useState({});
  const userId = JSON.parse(localStorage.getItem("id"));
  const { id } = useParams();

  const getTransaction = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `http://localhost:5001/api/transaction/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const resulttransaction = result.data.data.detailTransaction;
      setTransaction(resulttransaction);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `http://localhost:5001/api/user/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const resulttransaction = result.data.data.detailUser;
      setProfilUser(resulttransaction);
    } catch (err) {
      console.log(err);
    }
  };

  const listTrips = () => {
    if (transaction.Trip && transaction.Trip.date_trip)
      {return (
        <>
          <Container className="paymentdiv">
            {/* ROW 1 */}
            <Row>
              <Col style={{}} xs={12} md={9}>
                <Image style={{ width: "200px" }} src={DWT} fluid />
              </Col>
              <Col
                xs={12}
                md={3}
                className="justify-content-end"
                style={{ textAlign: "center" }}
              >
                <h4>
                  <b>Booking</b>
                </h4>
                <p>{transaction.date_trip}</p>
              </Col>
            </Row>
            {/* ROW 2 */}
            <Row>
              <Col xs={12} md={5} style={{}}>
                <Container>
                  <Row style={{}}>
                    <h3>{transaction.title}</h3>{" "}
                  </Row>
                </Container>
                <Container>
                  <Row>{transaction.Trip.Country.nama_negara}</Row>
                </Container>
                <Container>
                  <Row>
                    <p className="Payment">{transaction.status}</p>
                  </Row>
                </Container>
              </Col>
              <Col xs={12} md={2} style={{}}>
                <Container style={{}}>
                  <Row style={{}}>Date Trip</Row>
                  <Row>{transaction.Trip.date_trip}</Row>
                </Container>
                <br></br>
                <Container style={{}}>
                  <Row style={{}}>Accomodation</Row>
                  <Row>Hotel 4 night</Row>
                </Container>
              </Col>
              <Col xs={12} md={2} style={{}}>
                <Container style={{}}>
                  <Row style={{}}>Duration</Row>
                  <Row>{`${transaction.Trip.day} Day ${transaction.Trip.night} night`}</Row>
                </Container>
                <br></br>
                <Container style={{}}>
                  <Row style={{}}>Transportation</Row>
                  <Row>{transaction.Trip.transportation}</Row>
                </Container>
              </Col>
              <Col xs={12} md={3} style={{}}>
                <Container style={{ textAlign: "center" }}>
                  <Image
                    style={{ maxHeight: "138px" }}
                    src={BuktiPembayaranImg}
                    fluid
                  />
                  <p style={{}}>upload payment proof</p>
                </Container>
              </Col>
            </Row>
            {/* ROW 3 */}
            <Row>
              {/* START */}
              <Container>
                {/* Stack the columns on mobile by making one full-width and the other half-width */}
                <Row>
                  <Col xs={1} md={1} lg={1}>
                    <b>No</b>
                  </Col>
                  <Col xs={2} md={2} lg={2}>
                    <b>Full Name</b>
                  </Col>
                  <Col xs={2} md={2} lg={2}>
                    <b>Gender</b>
                  </Col>
                  <Col xs={2} md={2} lg={2}>
                    <b>Phone</b>
                  </Col>
                </Row>
                <hr></hr>
                <Row>
                  <Col xs={1} md={1} lg={1}>
                    1
                  </Col>
                  <Col xs={2} md={2} lg={2}>
                    {profilUser.fullname}
                  </Col>
                  <Col xs={2} md={2} lg={2}>
                    Gender
                  </Col>
                  <Col xs={2} md={2} lg={2}>
                    {profilUser.phone}
                  </Col>
                  <Col
                    xs={1}
                    md={1}
                    lg={2}
                    style={{ backgroundColor: "", textAlign: "center" }}
                  >
                    <b>Qty</b>
                  </Col>
                  <Col
                    xs={1}
                    md={1}
                    lg={1}
                    style={{ backgroundColor: "", textAlign: "right" }}
                  >
                    <b>:</b>
                  </Col>
                  <Col
                    xs={2}
                    md={2}
                    lg={2}
                    style={{ backgroundColor: "", textAlign: "center" }}
                  >
                    <b>{transaction.counterQty}</b>
                  </Col>
                </Row>
                <hr></hr>
                <Row>
                  <Col xs={7} md={7} lg={7}></Col>
                  <Col
                    xs={1}
                    md={1}
                    lg={2}
                    style={{ backgroundColor: "", textAlign: "center" }}
                  >
                    <b>Total</b>
                  </Col>
                  <Col
                    xs={1}
                    md={1}
                    lg={1}
                    style={{ backgroundColor: "", textAlign: "right" }}
                  >
                    <b>:</b>
                  </Col>
                  <Col
                    xs={2}
                    md={2}
                    lg={2}
                    style={{ backgroundColor: "", textAlign: "center" }}
                  >
                    <b style={{ color: "red" }}>
                      IDR.{" "}
                      {Intl.NumberFormat("de-ID").format(transaction.total)}
                    </b>
                  </Col>
                </Row>
                <br></br>
              </Container>
            </Row>
          </Container>
          <br></br>
        </>
      );    }
      else {return <h1>Loading</h1>}
  };

  useEffect(() => {
    if (transaction.Trip && transaction.Trip.date_trip) {
      listTrips();
    }
  }, [transaction]);

  useEffect(() => {
    getTransaction();
    getUser();
  }, []);

  return (
    <React.Fragment>
      <br></br>
      {listTrips()}
    </React.Fragment>
  );
};
export default PaymentPending;
