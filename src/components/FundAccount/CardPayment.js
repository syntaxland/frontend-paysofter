// CardPayment.js
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fundUserAccount,
  resetFundUserAccount,
} from "../../redux/actions/AccountFundActions";
import Message from "../Message";
import Loader from "../Loader";
import { formatAmount } from "../FormatAmount";
import Select from "react-select";
import { MONTH_CHOICES, YEAR_CHOICES } from "./payment-constants";

function CardPayment({ amount, currency, userEmail }) {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const fundAccountState = useSelector((state) => state.fundAccountState);
  const { loading, success, error } = fundAccountState;

  const [monthChoices, setMonthChoices] = useState([]);
  const [yearChoices, setYearChoices] = useState([]);

  useEffect(() => {
    setMonthChoices(MONTH_CHOICES);
    setYearChoices(YEAR_CHOICES);
  }, []);

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonthYear: null,
    expirationMonth: null,
    expirationYear: null,
    cvv: "",
  });

  const handlePaymentDetailsChange = (name, value) => {
    // Detect card type based on the card number prefix
    if (name === "cardNumber") {
      let detectedCardType = "";
      if (/^4/.test(value)) {
        detectedCardType = "Visa";
      } else if (/^5[1-5]/.test(value)) {
        detectedCardType = "Mastercard";
      }
      setCardType(detectedCardType);
    }

    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      paymentDetails.cardNumber &&
      paymentDetails.expirationMonth &&
      paymentDetails.expirationYear &&
      paymentDetails.cvv
    );
  };

  const createdAt = new Date().toISOString();

  const submitHandler = (e) => {
    e.preventDefault();

    const fundAccountData = {
      email: userEmail,
      amount: amount,
      currency: currency,
      created_at: createdAt,

      card_number: paymentDetails.cardNumber,
      expiration_month: paymentDetails.expirationMonth,
      expiration_year: paymentDetails.expirationYear,
    };

    dispatch(fundUserAccount(fundAccountData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetFundUserAccount());
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  return (
    <div>
      <h2 className="py-2 text-center">Debit Card ({currency})</h2>
      {success && (
        <Message variant="success">Payment made successfully.</Message>
      )}

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              handlePaymentDetailsChange("cardNumber", e.target.value)
            }
            required
            placeholder="1234 5678 9012 3456"
            maxLength="16"
          />
        </Form.Group>
        {cardType && (
          <p>
            Detected Card Type: {cardType}
            {cardType === "Visa " && <i className="fab fa-cc-visa"></i>}
            {cardType === "Mastercard " && (
              <i className="fab fa-cc-mastercard"></i>
            )}
          </p>
        )}
        <i className="fab fa-cc-mastercard"></i>{" "}
        <i className="fab fa-cc-visa"></i>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Expiration Month</Form.Label>
              <Select
                options={monthChoices?.map(([value, label]) => ({
                  value,
                  label,
                }))}
                onChange={(selectedOption) =>
                  handlePaymentDetailsChange(
                    "expirationMonth",
                    selectedOption.value
                  )
                }
                value={{
                  value: paymentDetails.expirationMonth,
                  label: paymentDetails.expirationMonth,
                }}
                placeholder="Select Month"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Expiration Year</Form.Label>
              <Select
                options={yearChoices?.map(([value, label]) => ({
                  value,
                  label,
                }))}
                value={{
                  value: paymentDetails.expirationYear,
                  label: paymentDetails.expirationYear,
                }}
                onChange={(selectedOption) =>
                  handlePaymentDetailsChange(
                    "expirationYear",
                    selectedOption.value
                  )
                }
                placeholder="Select Year"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="password"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={(e) => handlePaymentDetailsChange("cvv", e.target.value)}
            required
            maxLength="3"
            placeholder="123"
          />
        </Form.Group>
        <div className="text-center w-100 py-2">
          <Button variant="primary" type="submit" disabled={!isFormValid()}>
            Pay{" "}
            <span>
              ({formatAmount(amount)} {currency})
            </span>
          </Button>
        </div>
        <div className="py-2 d-flex justify-content-center text-center">
          {error && (
            <Form.Text className="text-danger">Error: {error}</Form.Text>
          )}
        </div>
      </Form>
    </div>
  );
}

export default CardPayment;
