// OtpDeactivateAccountFund.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deactivateAccountFund } from "../../redux/actions/AccountFundActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function OtpDeactivateAccountFund() {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteProfile = useSelector((state) => state.deleteProfile);
  const { success, error, loading } = deleteProfile;

  // const [accountId, setAccountId] = useState("");
  // const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const fundData = {
    // email: email,
    // account_id: accountId,
    identifier: identifier,
  };

  const handleDeactivateAccountFund = () => {
    dispatch(deactivateAccountFund(fundData));
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col>
          {/* <h2 className="py-3 text-center">OTP Account Fund Deactivation</h2> */}

          {loading && <Loader />}
          {success && (
            <Message variant="success">
              Account Fund deactivated successfully. 
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <Form>
            <Form.Group>
              {/* <Form.Label>Email Address or Account ID</Form.Label> */}
              <Form.Control
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter email or Account ID"
                className="rounded mt-2"
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleDeactivateAccountFund}
              className="rounded mt-2 py-2 text-center w-100"
              disabled
            >
              Deactivate Account Fund
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default OtpDeactivateAccountFund; 
