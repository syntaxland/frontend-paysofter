// PaymentScreen.js
import React, {
  useEffect,
  useState,
  // useCallback
} from "react";
import { Button, Row, Col, Modal, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentApiKeys } from "../../redux/actions/paymentActions";
import { fundUserAccount } from "../../redux/actions/AccountFundActions";
import PaystackUsd from "./PaystackUsd";
import Loader from "../Loader";
import Message from "../Message";
import { formatAmount } from "../FormatAmount";
import Paystack from "./Paystack";
import { Paysofter } from "../react-paysofter/src/index";
// import { Paysofter } from "react-paysofter";

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

  const fundAccountState = useSelector((state) => state.fundAccountState);
  const { loading: fundLoading, success, error: fundError } = fundAccountState;

  const getPaymentApiKeysState = useSelector(
    (state) => state.getPaymentApiKeysState
  );
  const { loading, error, paystackPublicKey, paysofterPublicKey } =
    getPaymentApiKeysState;

  const [paysofterApiKey, setPaysofterApiKey] = useState("");
  useEffect(() => {
    if (paysofterPublicKey) {
      setPaysofterApiKey(paysofterPublicKey);
    }
  }, [paysofterPublicKey]);

  console.log("apiKeys:", paystackPublicKey, paysofterApiKey);

  const createdAt = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

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

  const handleOnSuccess = () => {
    console.log("handling onSuccess...");

    const fundData = {
      email: userEmail,
      amount: amount,
      currency: currency,
      created_at: createdAt,
    };
    dispatch(fundUserAccount(fundData));
  };

  const [successTriggered, setSuccessTriggered] = useState(false);
  const onSuccess = () => {
    if (!successTriggered) {
      handleOnSuccess();
      setSuccessTriggered(true);
    }
  };

  const handleOnClose = () => {
    console.log("handling onClose...");
    // window.location.reload();
    // window.location.href = "/";
  };

  const onClose = () => {
    handleOnClose();
  };

  useEffect(() => {
    dispatch(getPaymentApiKeys());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      // setHasHandledSuccess(true);
      // setShowSuccessMessage(true);
      // handleOnSuccess();
      setTimeout(() => {
        // setShowSuccessMessage(false);
        // setShowSuccessScreen(true);
      }, 3000);
    }
  }, [success]);

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col md={8}>
            <h2 className="text-center py-2">Payment Page</h2>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {fundLoading && <Loader />}
            {fundError && <Message variant="danger">{fundError}</Message>}

            <div className="text-center py-2">
              <ListGroup>
                <ListGroup.Item>
                  <strong>
                    Amount: {formatAmount(amount)} {currency}
                  </strong>
                </ListGroup.Item>
              </ListGroup>
            </div>

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
                email={userEmail}
                currency={currency}
                amount={amount}
                paysofterPublicKey={paysofterApiKey}
                onSuccess={onSuccess}
                onClose={onClose}
                referenceId={`RID${Math.floor(
                  Math.random() * 10000000000000000
                )}`}
                showPromiseOption={false}
                showFundOption={false}
                showCardOption={true}
              />
            )}
          </Col>
        </div>
      </Row>
    </>
  );
}

export default PaymentScreen;
