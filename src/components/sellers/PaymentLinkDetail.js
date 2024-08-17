// PaymentLinkDetail.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getPaymentLinkDetail } from "../../redux/actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Paysofter } from "react-paysofter";

function PaymentLinkDetail({ location }) {
  const dispatch = useDispatch();
  const [sellerUsername, setSellerUsername] = useState("");
  const [pk, setPk] = useState("");
  console.log("pk, sellerUsername:", pk, sellerUsername);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    const pk = params.get("pk");
    if (ref) {
      setSellerUsername(ref);
    }
    if (pk) {
      setPk(pk);
    }
  }, [location.search]);

  useEffect(() => {
    if (pk && sellerUsername) {
      const linkData = {
        link_id: pk,
        seller_username: sellerUsername,
      };
      dispatch(getPaymentLinkDetail(linkData));
    }
  }, [dispatch, pk, sellerUsername]);

  const getPaymentLinkDetailState = useSelector(
    (state) => state.getPaymentLinkDetailState
  );
  const { loading, paymentLinks } = getPaymentLinkDetailState;

  console.log(
    "paymentLinks:",
    paymentLinks?.show_card_option,
    paymentLinks?.test_api_key,
    paymentLinks?.live_api_key,
    paymentLinks?.is_api_key_live,
    paymentLinks?.show_buyer_name,
    paymentLinks?.show_buyer_phone
  );

  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [paysofterPublicKey] = useState(
    paymentLinks?.is_api_key_live
      ? paymentLinks?.live_api_key
      : paymentLinks?.test_api_key
  );
  const [selectedCountry] = useState("US");

  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerEmailError, setBuyerEmailError] = useState("");

  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "buyerEmail":
        setBuyerEmail(value);
        setBuyerEmailError("");
        break;

      case "buyerName":
        setBuyerName(value);
        break;

      case "buyerPhone":
        setBuyerPhone(value);
        break;

      default:
        break;
    }
  };

  const initiatePayment = (e) => {
    e.preventDefault(e);

    if (!buyerEmail) {
      setBuyerEmailError("Please enter the payment name.");
    } else {
      setBuyerEmailError("");
    }

    if (!buyerEmail) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      setPaymentInitiated(true);
    }
  };

  const handleOnSuccess = () => {
    console.log("handling onSuccess...");
    // window.location.reload();
  };

  const onSuccess = () => {
    handleOnSuccess();
  };

  const handleOnClose = () => {
    console.log("handling onClose...");
    // window.location.reload();
  };

  const onClose = () => {
    handleOnClose();
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Payment Link</h2>
          <div className="text-center py-2">
            <img
              // src={paymentLinks.seller_logo}
              alt="Seller Logo"
              className="img-fluid"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <h6 className="text-center py-2">{paymentLinks?.payment_name}</h6>
          <strong className="text-center py-2">
            <i>{paymentLinks?.description} </i>
          </strong>
          {paymentLinks?.payment_qrcode && (
            <div className="text-center py-2">
              <img
                src={paymentLinks.payment_qrcode}
                alt="QR Code"
                className="img-fluid"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          )}
          {loading && <Loader />}

          {formError && (
            <Message variant="danger" fixed>
              {formError}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Buyer Email</Form.Label>
              <Form.Control
                type="email"
                value={buyerEmail}
                onChange={(e) =>
                  handleFieldChange("buyerEmail", e.target.value)
                }
                placeholder="Enter email"
                className="rounded py-2 mb-2"
                required
                maxLength={30}
              />
              <Form.Text className="text-danger">{buyerEmailError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Amount*</Form.Label>
              <Form.Control
                type="number"
                value={paymentLinks?.amount}
                // onChange={(e) => handleFieldChange("amount", e.target.value)}
                // placeholder="Enter amount"
                className="rounded py-2 mb-2"
                required
                disabled
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Currency*</Form.Label>
              <Form.Control
                type="select"
                value={paymentLinks?.currency}
                // onChange={(e) => handleFieldChange("currency", e.target.value)}
                // placeholder="Enter amount"
                className="rounded py-2 mb-2"
                required
                disabled
              />
            </Form.Group>

            {paymentLinks?.show_buyer_name && (
              <Form.Group>
                <Form.Label>Buyer Name</Form.Label>
                <Form.Control
                  type="text"
                  value={buyerName}
                  onChange={(e) =>
                    handleFieldChange("buyerName", e.target.value)
                  }
                  placeholder="Enter your name"
                  className="rounded py-2 mb-2"
                  required
                  maxLength={30}
                />
              </Form.Group>
            )}

            {paymentLinks?.show_buyer_phone && (
              <Form.Group>
                <Form.Label>Buyer Phone</Form.Label>
                <PhoneInput
                  country={selectedCountry}
                  value={buyerPhone}
                  maxLength={18}
                  onChange={(value) => {
                    setBuyerPhone(value);
                    handleFieldChange("buyerPhone", value);
                  }}
                />
              </Form.Group>
            )}
          </Form>

          <div className="d-flex justify-content-center py-3">
            <Button
              className="py-2 rounded w-100"
              variant="primary"
              onClick={initiatePayment}
              disabled={loading}
            >
              Pay Now
            </Button>
          </div>

          {paymentInitiated && (
            <Paysofter
              email={buyerEmail}
              currency={paymentLinks?.currency}
              amount={paymentLinks?.amount}
              paysofterPublicKey={paysofterPublicKey}
              onSuccess={onSuccess}
              onClose={onClose}
              paymentRef={`RID${Math.floor(Math.random() * 10000000000000000)}`}
              showPromiseOption={paymentLinks?.show_promise_option}
              showFundOption={paymentLinks?.show_fund_option}
              showCardOption={paymentLinks?.show_card_option}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentLinkDetail;
