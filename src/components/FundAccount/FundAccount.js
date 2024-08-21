// FundAccount.js
import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Select from "react-select";
import Message from "../Message";
// import Loader from "../Loader";
import PaymentScreen from "./PaymentScreen";

const FundAccount = ({ currency }) => {
  const [messsage, setMesssage] = useState("");
  const [amount, setAmount] = useState(0);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const MINIMUM_AMOUNTS = {
    NGN: 100,
    USD: 1,
    // other currencies
  };
  const minAmount = MINIMUM_AMOUNTS[currency] || 0;

  const submitHandler = (e) => {
    e.preventDefault();

    if (amount >= minAmount) {
      setShowPaymentPage(true);
    } else {
      setMesssage(`Minimum amount is ${minAmount} ${currency}.`);
    }
  };

  return (
    <Container>
      {!showPaymentPage && (
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="py-3 text-center">Fund {currency} Account</h2>

            {messsage && <Message variant="danger">{messsage}</Message>}
            {/* {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
              {/* <Form.Group controlId="currency">
                <Row className="py-2 d-flex justify-content-center">
                  <Col md={8}>
                    <div>
                      <Select
                        options={CURRENCY_CHOICES.map(([value, label]) => ({
                          value,
                          label,
                        }))}
                        value={{
                          value: currency,
                          label: currency,
                        }}
                        onChange={(selectedOption) =>
                          setCurrency(selectedOption.value)
                        }
                        placeholder="Currencies"
                        className="rounded py-2 mb-2"
                        required
                      />
                    </div>
                  </Col>
                </Row>
              </Form.Group> */}

              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="py-3 text-center">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="primary"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}

      {showPaymentPage && <PaymentScreen amount={amount} currency={currency} />}
    </Container>
  );
};

export default FundAccount;
