// Paystack.js
import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { fundUserAccount } from "../../redux/actions/AccountFundActions";
import Loader from "../Loader";
import Message from "../Message";
import { formatAmount } from "../FormatAmount";

function Paystack({ amount, currency, paystackPublicKey }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const userEmail = userInfo.email;
  const createdAt = new Date().toISOString();

  const fundAccountState = useSelector((state) => state.fundAccountState);
  const { loading, success, error } = fundAccountState;

  useEffect(() => {
    if (success) {
      history.push("/dashboard");
      window.location.reload();
    }
  }, [dispatch, success, history]);

  const onSuccess = () => {
    handlePayment();
    history.push("/");
  };

  const onClose = () => {
    console.log("Payment closed.");
    history.push("/");
  };

  const handlePayment = () => {
    const fundData = {
      email: userEmail,
      amount: amount,
      currency: currency,
      created_at: createdAt,
    };
    dispatch(fundUserAccount(fundData));
  };

  const paymentObject = {
    publicKey: paystackPublicKey,
    email: userEmail,
    // reference: reference,
    amount: amount * 100,
    currency: "NGN",
    onSuccess: onSuccess,
    onClose: onClose,
  };

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col>
            <h1 className="text-center py-3">Paystack Payment Option</h1>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            <ListGroup variant="flush">
              <ListGroup.Item>Amount: {formatAmount(amount)} {currency}</ListGroup.Item>
            </ListGroup>

            <div className="text-center py-2">
              <PaystackButton {...paymentObject}>
                <Button className="w-100 rounded" variant="dark">
                  Pay Now
                </Button>
              </PaystackButton>
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default Paystack;
