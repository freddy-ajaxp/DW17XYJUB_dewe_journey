import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import DWT from "../../../icons/DWT2.png";
import BuktiPembayaranImg from "../../../images/bukti.png";
import { Button, Row, Col, Modal, Image } from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import { LinkContainer } from "react-router-bootstrap/lib/ReactRouterBootstrap";
import "./payment.css";

const Payment = () => {
  const [show, setShowLogin] = useState(false);
  const [todos, setTodos] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [formUpdateTrans, setFormUpdateTrans] = useState({ status: "" });
  const [profilUser, setProfilUser] = useState({});
  const [transIdModal, setTransIdModal] = useState(); //id trans to pass to modal
  const userId = JSON.parse(localStorage.getItem("id"));
  

  // const location = useLocation();
  const confirmationModal = () => {
    show ? setShowLogin(false) : setShowLogin(true);
  };

  const clickPay = async (idTransaksi) => {
    setTransIdModal(idTransaksi);
    show ? setShowLogin(false) : setShowLogin(true);
    await setFormUpdateTrans({ status: "Waiting Approve" });
    axios
      .patch(
        `http://localhost:5001/api/transaction/${idTransaksi}`,
        { status: "Waiting Approval" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      )
      .then((res) => {
        console.log("res patch trans :", res);
      })
      .catch((err) => {
        console.log("error patch trans :", err);
      });
  };

  const getTransactions = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `http://localhost:5001/api/transactions/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const resultTransactions = result.data.data.transactions;
      setTransactions(resultTransactions);
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
      const resultTransactions = result.data.data.detailUser;
      setProfilUser(resultTransactions);
    } catch (err) {
      console.log(err);
    }
  };

  const listTrips = transactions.map((dataTrip) => {
    return (
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
              <p>{dataTrip.Trip.date_trip}</p>
            </Col>
          </Row>
          {/* ROW 2 */}
          <Row>
            <Col xs={12} md={5} style={{}}>
              <Container>
                <Row style={{}}>
                  <h3>{dataTrip.Trip.title}</h3>{" "}
                </Row>
              </Container>
              <Container>
                <Row>{dataTrip.Trip.Country.nama_negara}</Row>
              </Container>
              <Container>
                <Row>
                  <p className="Payment">{dataTrip.status}</p>
                </Row>
              </Container>
            </Col>
            <Col xs={12} md={2} style={{}}>
              <Container style={{}}>
                <Row style={{}}>Date Trip</Row>
                <Row>{dataTrip.Trip.date_trip}</Row>
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
                <Row>{`${dataTrip.Trip.day} Day ${dataTrip.Trip.night} night`}</Row>
              </Container>
              <br></br>
              <Container style={{}}>
                <Row style={{}}>Transportation</Row>
                <Row>{dataTrip.Trip.transportation}</Row>
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
                  <b>{dataTrip.counterQty}</b>
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
                    IDR. {Intl.NumberFormat("de-ID").format(dataTrip.total)}
                  </b>
                </Col>
              </Row>
              <br></br>
              {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
              {/* Columns are always 50% wide, on mobile and desktop */}
            </Container>
          </Row>
        </Container>
        <br></br>
        <Container>
          {dataTrip.status != "Waiting Approval" && (
            <Row>
              <Col lg={10} />
              <Col style={{ textAlign: "right" }}>
                <Button
                  block
                  variant="warning"
                  style={{}}
                  onClick={() => {
                    return clickPay(dataTrip.id);
                  }}
                >
                  {"  Bayar  "}
                </Button>{" "}
              </Col>
            </Row>
          )}
        </Container>
        <br></br>
      </>
    );
  });

  useEffect(() => {
  }, [transactions]);

  useEffect(() => {
    getTransactions();
    getUser();
  }, []);

  return (
    <React.Fragment>
      {listTrips}
      <Modal show={show} onHide={confirmationModal}>
      <Link
          to={{
            pathname: `/PaymentPending/${transIdModal}`,
            propsTrip: { idTransaction: transIdModal },
          }}
        >
        <div>
          <p style={{ textAlign: "center" }}>
          
            <h2>
              Your payment will be confirmed within
              1 x 24 hours <br />
              To see orders click{" "}
              {/* <a href={`/PaymentPending/${transIdModal}`}>
                <u>here</u>
              </a>{" "} */}
              thank you
            </h2>
          </p>
        </div>
        </Link>
      </Modal>
    </React.Fragment>
  );
};
export default Payment;
