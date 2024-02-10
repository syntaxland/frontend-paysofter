// SetMaxUsdWithdrawal.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { setMaxUsdWithdrawal } from "../../redux/actions/AccountFundActions";  

import Loader from "../Loader";
import Message from "../Message";

function SetMaxUsdWithdrawal({ history }) {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("200");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const setMaxUsdFundState = useSelector((state) => state.setMaxUsdFundState);
  const { loading, success, error } = setMaxUsdFundState;

  const submitHandler = (e) => {
    e.preventDefault();

    const amountData = {
      amount: amount,
    };

    dispatch(setMaxUsdWithdrawal(amountData));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {/* <h2 className="text-center">Set Maximum Withdrawal Amount</h2> */}
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">
              Maximum withdrawal amount limit of {amount} set successfully.
            </Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                as="select"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              >
                <option value="10">Less than 10</option>
                <option value="100">Less than 100</option>
                <option value="500">Less than 500</option>
                <option value="1000">Less than 1,000</option>
                <option value="2000">Less than 2,000</option>
                <option value="5000">Less than 5,000</option>
                <option value="10000">Less than 10,000</option>
                <option value="1000000">More than 10,000</option>
              </Form.Control>
            </Form.Group>

            <div className="py-2">
              <Button
                className="w-100 rounded"
                type="submit"
                variant="primary"
                disabled={loading || success}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SetMaxUsdWithdrawal;
