import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import OtpDeactivateAccountFund from "./settings/OtpDeactivateAccountFund";

function Footer() {
  const [showSetMaxFund, setShowSetMaxFund] = useState(false);

  const handleSetMaxFundOpen = () => {
    setShowSetMaxFund(true);
  };

  const handleSetMaxFundClose = () => {
    setShowSetMaxFund(false);
  };

  return (
    // <footer className="text-light footer custom-dark-blue">
    <footer className="bg-primary text-light footer custom-dark-blue">
      <Container fluid>
        <Row className="py-3">
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
        </Row>
        <Row>
          <Col className="text-muted py-1 text-center">
            <ul className="">
              <strong>Offices:</strong> Lagos (<strong>Coming soon:</strong> San
              Francisco, Ontario, London, Dubai, Mumbai, Ghana, Johannesburg,
              Sidney, Brazil, Kanye)
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
        <Row>
          <Col className="text-center py-1">
            &copy; Paysofter Inc. | Powered by SoftGlobal | +2349066167293
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
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
                Deactivate
              </Button>
            </p>

            <Modal show={showSetMaxFund} onHide={handleSetMaxFundClose}>
              <Modal.Header closeButton>
                <Modal.Title className="text-center w-100 py-2">
                  Deactivate Account Fund
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {showSetMaxFund && <OtpDeactivateAccountFund />}
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
