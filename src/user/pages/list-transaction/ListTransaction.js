import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Table, Row, Col, Image, Modal } from "react-bootstrap";
import SearchIcon from "../../../icons/search.png";
import DWT from "../../../icons/DWT2.png";
import BuktiPembayaranImg from "../../../images/bukti.png";

const Home = () => {
  const [ShowModal, setShowModal] = useState(false);
  const [incomingTrips, setIncomingTrips] = useState([]);
  const [dataModal, setDataModal] = useState({Trip:{Country:''}});
  const [transApproval, setTransApproval] = useState();

  const actionModal = (dataTrans) => {
    if (ShowModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
      console.log("dataTrans yang diklik", dataTrans);
      setDataModal(dataTrans);
    }
  };

  const getTripList = async (dataTransaksi) => {
    const token = localStorage.getItem("token");
    const result = await axios({
      method: "GET",
      url: "http://localhost:5001/api/transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resultData = result.data.data.transactions;
    setIncomingTrips(resultData);
    console.log(resultData);
  };

  const cardTransaksi = () => {
    return (<>
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
            <p>{dataModal.Trip.date_trip}</p>
          </Col>
        </Row>
        {/* ROW 2 */}
        <Row>
          <Col xs={12} md={5} style={{}}>
            <Container>
              <Row style={{}}>
                <h3>{dataModal.Trip.title}</h3>{" "}
              </Row>
            </Container>
            <Container>
              <Row>{dataModal.Trip.Country.nama_negara}</Row>
            </Container>
            <Container>
              <Row>
                <p className="Payment">{dataModal.status}</p>
              </Row>
            </Container>
          </Col>
          <Col xs={12} md={2} style={{}}>
            <Container style={{}}>
              <Row style={{}}>Date Trip</Row>
              <Row>{dataModal.Trip.date_trip}</Row>
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
              <Row>{`${dataModal.Trip.day} Day ${dataModal.Trip.night} night`}</Row>
            </Container>
            <br></br>
            <Container style={{}}>
              <Row style={{}}>Transportation</Row>
              <Row>{dataModal.Trip.transportation}</Row>
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
              <Col xs={2} md={2} lg={1}>
                <b>Full Name</b>
              </Col>
              <Col xs={2} md={2} lg={1}>
                <b>Gender</b>
              </Col>
              <Col xs={2} md={2} lg={1}>
                <b>Phone</b>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <Col xs={1} md={1} lg={1}>
                1
              </Col>
              <Col xs={2} md={2} lg={2}>
                FULL NAME
              </Col>
              <Col xs={2} md={2} lg={2}>
                Gender
              </Col>
              <Col xs={2} md={2} lg={2}>
                PHONE
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
                <b>{dataModal.counterQty}</b>
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
                  IDR. {Intl.NumberFormat("de-ID").format(dataModal.total)}
                </b>
              </Col>
            </Row>
            <br></br>
            {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
            {/* Columns are always 50% wide, on mobile and desktop */}
          </Container>
        </Row>
      </Container>
      <br/>
        <Container>
        <br></br>
            <Row>
              <Col lg={9} />
              {dataModal.status!=='Waiting Payment' && 
              <><Col style={{ textAlign: "right" }}>
                <Button
                  block
                  variant="danger"
                  style={{}}
                  onClick={() => {
                  }}
                >
                  {"Cancel"}
                </Button>{" "}
              </Col>
              <Col style={{ textAlign: "right" }}>
                <Button
                  block
                  variant="success"
                  style={{}}
                  onClick={() => {
                  }}
                >
                  {"Approve"}
                </Button>{" "}
              </Col></>}
            </Row>
            <br></br>
        </Container>
        </>

    );
  };
  useEffect(() => {
    getTripList();
  }, []);

  useEffect(() => {
    console.log("dataModal", dataModal);
    cardTransaksi(dataModal);
  }, [dataModal]);

  useEffect(() => {
    console.log(incomingTrips);
  }, [incomingTrips]);

  let counter = 0;
  const listTrips = incomingTrips.map(
    (dataTrans) => (
      counter++,
      (
        <tr>
          <td>{counter}</td>
          <td>User 1</td>
          <td>{dataTrans.Trip.title}</td>
          <td>
            <p style={{ color: "red", textAlign: "center" }}>
              {" "}
              <a
                style={{ textAlign: "center" }}
                href="https://www.pakaiatm.com/wp-content/uploads/2020/03/Contoh-Bukti-Transfer-BRI-Asli-atau-Palsu.jpg"
                target="_blank"
              >
                bukti transaksi
              </a>
            </p>
          </td>
          <td>
            <p style={{ color: "orange", textAlign: "center" }}>
              {dataTrans.status}
            </p>
          </td>
          <td>
            <Image
              src={SearchIcon}
              roundedCircle
              style={{ maxWidth: "25px" }}
              class="img-responsive"
              onClick={() => {
                return actionModal(dataTrans);
              }}
            />
          </td>
        </tr>
      )
    )
  );
  return (
    <React.Fragment>
      <Container className="p-3" style={{ minHeight: "50rem" }}>
        <h1>List Transaction</h1>
        <br></br>
        <div>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>User</th>
                <th>Trip</th>
                <th>Bukti Transfer</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{listTrips}</tbody>
          </Table>
        </div>
        <Modal size="xl" show={ShowModal} onHide={actionModal}>
          {cardTransaksi()}
        </Modal>
      </Container>
    </React.Fragment>
  );
};

export default Home;
