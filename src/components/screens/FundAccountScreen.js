// FundAccountScreen.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { fundUserAccount } from "../../redux/actions/AccountFundActions";
import Message from "../Message";
import Loader from "../Loader";

const FundAccountScreen = ({ history }) => {
  const dispatch = useDispatch();

  const fundAccountState = useSelector((state) => state.fundAccountState);
  const { loading, success, error } = fundAccountState;

  const [currency, setCurrency] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentProvider, setPaymentProvider] = useState("");
  const [amount, setAmount] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();

    const fundAccountData = {
      currency: currency,
      payment_method: paymentMethod,
      payment_provider: paymentProvider,
      amount: amount,
    };
    console.log("fundAccountData:", fundAccountData);

    dispatch(fundUserAccount(fundAccountData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="py-3 text-center">Fund Account</h2>
          {success && (
            <Message variant="success">Request sent successfully.</Message>
          )}

          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                maxLength={30}
              />
            </Form.Group>

            <Form.Group controlId="paymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter payment method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                maxLength={30}
              />
            </Form.Group>

            <Form.Group controlId="paymentProvider">
              <Form.Label>Payment Provider</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter payment provider"
                value={paymentProvider}
                onChange={(e) => setPaymentProvider(e.target.value)}
                required
                maxLength={30}
              />
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <div className="py-3 text-center">
              <Button className="w-100 rounded" type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FundAccountScreen;
