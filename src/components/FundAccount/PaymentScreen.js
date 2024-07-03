// PaymentScreen.js
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentApiKeys } from "../../redux/actions/paymentActions";
import Paystack from "./Paystack";
import Paysofter from "./Paysofter";
import PaystackUsd from "./PaystackUsd";
import Loader from "../Loader";
import Message from "../Message";

function PaymentScreen({ amount, currency }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const userEmail = userInfo.email;

  const getPaymentApiKeysState = useSelector(
    (state) => state.getPaymentApiKeysState
  );
  const { loading, error, paystackPublicKey, paysofterPublicKey } =
    getPaymentApiKeysState;
  console.log("apiKeys:", paystackPublicKey, paysofterPublicKey);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const handlePaymentGatewaySelection = (paymentGateway) => {
    setSelectedPaymentGateway(paymentGateway);
  };

  const paymentData = {
    currency,
    amount,
    userEmail,
    paystackPublicKey,
    paysofterPublicKey,
  };
  // console.log("paymentData:", paymentData);

  useEffect(() => {
    dispatch(getPaymentApiKeys());
  }, [dispatch]);

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col md={6}>
            <h1 className="text-center py-2">Payment Page</h1>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            <div className="text-center py-2">
              <Row className="text-center py-2">
                <Col md={11}>
                  <Button
                    variant="dark"
                    onClick={() => handlePaymentGatewaySelection("paystack")}
                    className="mr-2 rounded w-100"
                  >
                    Pay with Paystack
                  </Button>
                </Col>
                <Col md={1}>
                  <Button variant="outline">
                    {/* <i className="fa fa-info-circle"></i> */}
                  </Button>
                </Col>
              </Row>

              <Row className="text-center py-2">
                <Col md={11}>
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentGatewaySelection("paysofter")}
                    className="mr-2 rounded w-100"
                    // disabled
                  >
                    Pay with Paysofter
                  </Button>
                </Col>
                <Col md={1}>
                  <Button
                    variant="outline"
                    onClick={handleInfoModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Don't have a Paysofter account? Click here."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Paysofter Account
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Don't have a Paysofter account? You're just about 3
                        minutes away! Sign up for a much softer payment
                        experience.{" "}
                        <a
                          href="https://paysofter.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          <span>
                            <Button
                              variant="primary"
                              size="sm"
                              className="text-center py-2"
                            >
                              Create A Free Account
                            </Button>
                          </span>
                        </a>
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </div>

            {currency === "NGN" && (
              <div>
                {selectedPaymentGateway === "paystack" && (
                  <Paystack
                    paymentData={paymentData}
                    currency={currency}
                    amount={amount}
                    userEmail={userEmail}
                  />
                )}
              </div>
            )}

            {currency === "USD" && (
              <div>
                {selectedPaymentGateway === "paystack" && (
                  <PaystackUsd
                    paymentData={paymentData}
                    currency={currency}
                    amount={amount}
                    userEmail={userEmail}
                  />
                )}
              </div>
            )}

            {selectedPaymentGateway === "paysofter" && (
              <Paysofter
                currency={currency}
                amount={amount}
                userEmail={userEmail}
              />
            )}
          </Col>
        </div>
      </Row>
    </>
  );
}

export default PaymentScreen;
