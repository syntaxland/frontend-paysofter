// Footer.js
import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import OtpDisableAccountFund from "./settings/OtpDisableAccountFund";

function Footer() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const currentYear = new Date().getFullYear();
  const [showSetMaxFund, setShowSetMaxFund] = useState(false);

  const handleSetMaxFundOpen = () => {
    setShowSetMaxFund(true);
  };

  const handleSetMaxFundClose = () => {
    setShowSetMaxFund(false);
  };

  const softGlobalLink = () => {
    window.location.href = "http://softglobal.org";
  };

  return (
    // <footer className="text-light footer custom-dark-blue">
    <footer className="bg-primary text-light footer custom-dark-blue py-2">
      <Row>
        <Col>
          {/* <Row className="py-3">
            <Col className="text-center">
              <h5>Company</h5>
              <ul className="list-unstyled">
                <li>Contact Us</li>
                <li>Terms of Service</li>
              </ul>
            </Col>
            <Col className="text-center">
              <h5>Categories</h5>
              <ul className="list-unstyled">
                <li>Payments</li>
                <li>Financial Services</li>
              </ul>
            </Col>
            <Col className="text-center">
              <h5>Support</h5>
              <ul className="list-unstyled">
                <li>FAQs</li>
                <li>Customer Service</li>
              </ul>
            </Col>
          </Row> */}

          <Row>
            <Col className="text-muted py-2 text-center">
              <ul className="">
                <strong>Offices:</strong> Lagos (<strong>Coming soon:</strong>{" "}
                San Francisco, Ontario, London, Dubai, Mumbai, Accra,
                Johannesburg, Sidney, Sao Paulo, Nairobi, Shanghai, Amsterdam,
                Frankfurt)
                {/* <li>Ontario</li>
              <li>London</li>
              <li>Dubai</li>
              <li>Mumbai</li>
              <li>Ghana</li>
              <li>Johannesburg</li>
              <li>Brazil</li>
              <li>Kanye</li> */}
              </ul>
            </Col>
          </Row>

          {!userInfo ? (
            <Row>
              <Col className="d-flex justify-content-center text-center py-2">
                <p>
                  Lost access to your Account Fund?{" "}
                  <Button
                    variant="danger"
                    onClick={handleSetMaxFundOpen}
                    title="Set Account Fund active or locked."
                  >
                    <i
                      className="fas fa-sack-dollar"
                      style={{ fontSize: "18px" }}
                    ></i>{" "}
                    Disable
                  </Button>
                </p>

                <Modal show={showSetMaxFund} onHide={handleSetMaxFundClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center w-100 py-2">
                      Disable Account Fund
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {showSetMaxFund && <OtpDisableAccountFund />}
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>
          ) : null}

          <Row>
            <Col className="text-center py-2">
              <p>
                &copy; Paysofter Inc, {currentYear}. |{" "}
                <i>For a softer payment experience...</i>
                {/* <i>A payment solution for all humans...</i> */}
              </p>

              <p>
                <Button
                  variant="outline-transparent"
                  className="rounded"
                  onClick={softGlobalLink}
                >
                  <i style={{ fontSize: "12px", color: "white" }}>
                    Powered by SoftGlobal
                  </i>
                </Button>{" "}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
