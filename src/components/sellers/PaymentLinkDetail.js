// PaymentLinkDetail.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { getPaymentLinkDetail } from "../../redux/actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import { formatAmount } from "../FormatAmount";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { Paysofter } from "react-paysofter";
import QRCode from "qrcode.react";

function PaymentLinkDetail({ location }) {
  const dispatch = useDispatch();
  const linkRef = useRef(null);

  const [sellerUsername, setSellerUsername] = useState("");
  const [pk, setPk] = useState("");
  // console.log("pk, sellerUsername:", pk, sellerUsername);

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
  const {
    loading,
    paymentLinks,
    sellerBusinessName,
    // sellerTradingName,
    sellerLogo,
    sellerTestApiKey,
    sellerLiveApiKey,
    isSellerApiKeyLive,
  } = getPaymentLinkDetailState;

  console.log("paymentLinks:", paymentLinks?.payment_link);

  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const [paysofterPublicKey, setPaysofterPublicKey] = useState("");
  const [showPromiseOption, setShowPromiseOption] = useState("");
  const [showFundOption, setShowFundOption] = useState("");
  const [showCardOption, setShowCardOption] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productCurrency, setProductCurrency] = useState("");
  const [productQty, setProductQty] = useState("");
  const [showQty, setShowQty] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  useEffect(() => {
    if (paymentLinks) {
      const key = isSellerApiKeyLive ? sellerLiveApiKey : sellerTestApiKey;
      setPaysofterPublicKey(key);

      setShowPromiseOption(paymentLinks.show_promise_option);
      setShowFundOption(paymentLinks.show_fund_option);
      setShowCardOption(paymentLinks.show_card_option);
      setProductAmount(paymentLinks.amount);
      setProductCurrency(paymentLinks.currency);
      setPaymentLink(paymentLinks.payment_link);
      setProductQty(paymentLinks.qty);
      setShowQty(paymentLinks.show_qty);
    }
  }, [paymentLinks, isSellerApiKeyLive, sellerLiveApiKey, sellerTestApiKey]);

  // // dev
  // useEffect(() => {
  //   if (paymentLinks) {
  //     const key = paymentLinks.is_api_key_live
  //       ? "live_api_key_4u0s3g57f7dsdefs0aad1ejx1n0xj114d8t73pn1gddcx9fdqg"
  //       : "test_api_key_8q45lnpo9kchan2z84ottwdd8lwib1phq70lxqhmordpxycg6c";
  //     setPaysofterPublicKey(key);

  //     setShowPromiseOption(paymentLinks.show_promise_option);
  //     setShowFundOption(paymentLinks.show_fund_option);
  //     setShowCardOption(paymentLinks.show_card_option);
  //     setProductAmount(paymentLinks.amount);
  //     setProductCurrency(paymentLinks.currency);
  //     setProductQty(paymentLinks.qty);
  //     setShowQty(paymentLinks.show_qty);
  //   }
  // }, [paymentLinks, isSellerApiKeyLive, sellerLiveApiKey, sellerTestApiKey]);

  // console.log("isSellerApiKeyLive:", isSellerApiKeyLive);
  // console.log("sellerTestApiKey:", sellerTestApiKey);
  // console.log("sellerLiveApiKey:", sellerLiveApiKey);
  // console.log("showPromiseOption:", paymentLinks?.show_promise_option);
  // console.log("showFundOption:", paymentLinks?.show_fund_option);
  // console.log("showCardOption:", paymentLinks?.show_card_option);

  const [selectedCountry] = useState("US");

  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerEmailError, setBuyerEmailError] = useState("");

  const [formError, setFormError] = useState("");

  const [showQtyUnitModal, setShowQtyUnitModal] = useState(false);
  const handleQtyUnitModalShow = () => {
    setShowQtyUnitModal(true);
  };
  const handleQtyUnitModalClose = () => {
    setShowQtyUnitModal(false);
  };

  const [selectedQty, setSelectedQty] = useState(1);
  const handleQtyChange = (selectedOption) => {
    setSelectedQty(selectedOption.value);
  };
  const calculateTotalPrice = () => {
    return selectedQty * productAmount;
  };
  console.log(
    "qty:",
    selectedQty,
    "amt:",
    calculateTotalPrice(),
    productCurrency
  );

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
      setBuyerEmailError("Please enter email.");
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
    window.location.reload();
  };

  const onClose = () => {
    handleOnClose();
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-3">
        <Col xs={12} md={6}>
          <h2 className="text-center py-3">Paysofter Link</h2>

          <Row className="d-flex justify-content-between text-center">
            <Col md={6}>
              {sellerLogo && (
                <img
                  src={sellerLogo}
                  alt="Seller Logo"
                  className="img-fluid"
                  style={{ width: "50px", height: "50px" }}
                />
              )}
              <h6 className="text-center">{sellerBusinessName}</h6>
            </Col>

            <Col md={6}>
              {/* {paymentLinks?.payment_qrcode && (
                <div>
                  <img
                    src={paymentLinks.payment_qrcode}
                    alt="QR Code"
                    className="img-fluid"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              )} */}

              <div
                ref={linkRef}
                style={{
                  padding: "20px",
                  backgroundColor: "#6c757d",
                  width: "140px",
                  height: "140px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <QRCode
                  value={paymentLink}
                  size={100}
                  bgColor="#fff"
                  fgColor="#343a40"
                  // level="L"
                />
              </div>
            </Col>
          </Row>

          <div className="d-flex justify-content-center text-center mt-4 py-2">
            {paymentLinks.payment_image && (
              <img
                src={paymentLinks?.payment_image}
                alt="Product"
                className="img-fluid"
                style={{ width: "80px", height: "80px" }}
              />
            )}
            <h6 className="text-center mr-2 py-2">
              {paymentLinks?.payment_name}
            </h6>
          </div>

          <div className="d-flex justify-content-center text-center py-2">
            <strong>
              <i>{paymentLinks?.description} </i>
            </strong>
          </div>

          {loading && <Loader />}
          {formError && (
            <Message variant="danger" fixed>
              {formError}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Buyer Email*</Form.Label>
              <Form.Control
                type="email"
                value={buyerEmail}
                onChange={(e) =>
                  handleFieldChange("buyerEmail", e.target.value)
                }
                placeholder="Enter email"
                className="rounded py-2 mb-2"
                required
                maxLength={225}
              />
              <Form.Text className="text-danger">{buyerEmailError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Amount*</Form.Label>
              {/* <Form.Control
                type="number"
                value={productAmount}
                onChange={(e) => handleFieldChange("amount", e.target.value)}
                placeholder="Enter amount"
                className="rounded py-2 mb-2"
                required
                disabled
              /> */}
              <input
                type="text"
                // value={formatAmount(productAmount)}
                value={formatAmount(calculateTotalPrice())}
                className="form-control rounded py-2 mb-2"
                disabled
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Currency*</Form.Label>
              <Form.Control
                type="select"
                value={productCurrency}
                // onChange={(e) => handleFieldChange("currency", e.target.value)}
                // placeholder="Enter amount"
                className="rounded py-2 mb-2"
                required
                disabled
              />
            </Form.Group>

            {showQty && (
              <Form.Group>
                <Row className="py-2">
                  <Col md={10}>
                    <Form.Label>Select Quantity</Form.Label>
                    <Select
                      value={{
                        value: selectedQty,
                        label: selectedQty.toString(),
                      }}
                      onChange={handleQtyChange}
                      options={Array.from({ length: productQty }, (_, i) => ({
                        value: i + 1,
                        label: (i + 1).toString(),
                      }))}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline"
                      onClick={handleQtyUnitModalShow}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Units of the items to be paid  for."
                    >
                      <i className="fa fa-info-circle"> </i>
                    </Button>

                    <Modal
                      show={showQtyUnitModal}
                      onHide={handleQtyUnitModalClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="text-center w-100 py-2">
                          Quantity Info
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="text-center">
                          Units of the items to be paid for.
                        </p>
                      </Modal.Body>
                    </Modal>
                  </Col>
                </Row>
              </Form.Group>
            )}

            {paymentLinks?.show_buyer_name && (
              <Form.Group>
                <Form.Label>Buyer Name</Form.Label>
                <Form.Control
                  type="text"
                  value={buyerName}
                  onChange={(e) =>
                    handleFieldChange("buyerName", e.target.value)
                  }
                  placeholder="Enter name"
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
                  maxLength={20}
                  onChange={(value) => {
                    setBuyerPhone(value);
                    handleFieldChange("buyerPhone", value);
                  }}
                />
              </Form.Group>
            )}
          </Form>

          <div className="d-flex justify-content-center my-3 py-3">
            <Button
              className="py-2 rounded w-100"
              variant="primary"
              onClick={initiatePayment}
              disabled={loading}
            >
              Pay{" "}
              <span>
                ({formatAmount(calculateTotalPrice())} {productCurrency})
              </span>
            </Button>
          </div>

          {paymentInitiated && (
            <Paysofter
              email={buyerEmail}
              buyerName={buyerName}
              buyerPhoneNumber={buyerPhone}
              currency={productCurrency}
              amount={calculateTotalPrice()}
              paysofterPublicKey={paysofterPublicKey}
              onSuccess={onSuccess}
              onClose={onClose}
              referenceId={`RID${Math.floor(
                Math.random() * 10000000000000000
              )}`}
              qty={selectedQty}
              productName={paymentLinks?.payment_name}
              showPromiseOption={showPromiseOption}
              showFundOption={showFundOption}
              showCardOption={showCardOption}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentLinkDetail;
