// CreatePaymentLink.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createPaymentLink } from "../../redux/actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
import { MAIN_CURRENCY_CHOICES } from "../constants";

function CreatePaymentLink() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [mainCurrencyChoices, setMainCurrencyChoices] = useState([]);

  useEffect(() => {
    setMainCurrencyChoices(MAIN_CURRENCY_CHOICES);
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const createPaymentLinkState = useSelector(
    (state) => state.createPaymentLinkState
  );
  const { success, error, loading } = createPaymentLinkState;

  const [paymentName, setPaymentName] = useState("");
  const [paymentNameError, setPaymentNameError] = useState("");

  const [currency, setCurrency] = useState("NGN");
  const [currencyError, setCurrencyError] = useState("");

  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const [qty, setQty] = useState(1);
  const [showQty, setShowQty] = useState(false);

  const [showPromiseOption, setShowPromiseOption] = useState(true);
  const [showFundOption, setShowFundOption] = useState(false);
  const [showCardOption, setShowCardOption] = useState(false);
  const [showBuyerName, setShowBuyerName] = useState(false);
  const [showBuyerPhone, setShowBuyerPhone] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [image, setImage] = useState("");

  const [formError, setFormError] = useState("");

  const [showQtyUnitModal, setShowQtyUnitModal] = useState(false);
  const handleQtyUnitModalShow = () => {
    setShowQtyUnitModal(true);
  };
  const handleQtyUnitModalClose = () => {
    setShowQtyUnitModal(false);
  };

  const [showQtyModal, setShowQtyModal] = useState(false);
  const handleQtyModalShow = () => {
    setShowQtyModal(true);
  };
  const handleQtyModalClose = () => {
    setShowQtyModal(false);
  };

  const [showPromiseModal, setShowPromiseModal] = useState(false);
  const handlePromiseModalShow = () => {
    setShowPromiseModal(true);
  };
  const handlePromiseModalClose = () => {
    setShowPromiseModal(false);
  };

  const [showCardModal, setShowCardModal] = useState(false);
  const handleCardModalShow = () => {
    setShowCardModal(true);
  };
  const handleCardModalClose = () => {
    setShowCardModal(false);
  };

  const [showFundModal, setShowFundModal] = useState(false);
  const handleFundModalShow = () => {
    setShowFundModal(true);
  };
  const handleFundModalClose = () => {
    setShowFundModal(false);
  };

  const [showBuyerNameModal, setShowBuyerNameModal] = useState(false);
  const handleBuyerNameModalShow = () => {
    setShowBuyerNameModal(true);
  };
  const handleBuyerNameModalClose = () => {
    setShowBuyerNameModal(false);
  };

  const [showBuyerPhoneModal, setShowBuyerPhoneModal] = useState(false);
  const handleBuyerPhoneModalShow = () => {
    setShowBuyerPhoneModal(true);
  };
  const handleBuyerPhoneModalClose = () => {
    setShowBuyerPhoneModal(false);
  };

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "paymentName":
        setPaymentName(value);
        setPaymentNameError("");
        break;

      case "image":
        setImage(value);
        break;

      case "currency":
        setCurrency(value);
        setCurrencyError("");
        break;

      case "amount":
        setAmount(value);
        setAmountError("");
        break;

      case "qty":
        setQty(value);
        break;

      case "showQty":
        setShowQty(value);
        break;

      case "description":
        setDescription(value);
        setDescriptionError("");
        break;

      case "showPromiseOption":
        setShowPromiseOption(value);
        break;

      case "showCardOption":
        setShowCardOption(value);
        break;

      case "showFundOption":
        setShowFundOption(value);
        break;

      case "showBuyerName":
        setShowBuyerName(value);
        break;

      case "showBuyerPhone":
        setShowBuyerPhone(value);
        break;

      default:
        break;
    }
  };

  const sellerData = new FormData();
  sellerData.append("payment_name", paymentName);
  sellerData.append("currency", currency);
  sellerData.append("amount", amount);
  sellerData.append("qty", qty);
  sellerData.append("description", description);
  sellerData.append("show_promise_option", showPromiseOption);
  sellerData.append("show_fund_option", showFundOption);
  sellerData.append("show_card_option", showCardOption);
  sellerData.append("show_buyer_name", showBuyerName);
  sellerData.append("show_buyer_phone", showBuyerPhone);
  sellerData.append("show_qty", showQty);
  sellerData.append("payment_image", image);

  console.log("sellerData:", sellerData);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/links/");
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handleCreatePaymentLink = (e) => {
    e.preventDefault(e);

    if (!paymentName) {
      setPaymentNameError("Please enter the payment name.");
    } else {
      setPaymentNameError("");
    }

    if (!currency) {
      setCurrencyError("Please select currency.");
    } else {
      setCurrencyError("");
    }

    if (!amount) {
      setAmountError("Please enter amount.");
    } else {
      setAmountError("");
    }

    if (!description) {
      setDescriptionError("Please enter the description.");
    } else {
      setDescriptionError("");
    }

    if (!paymentName || !currency || !amount || !description) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      dispatch(createPaymentLink(sellerData));
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Create Paysofter Link</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Paysofter link created successfully.
            </Message>
          )}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}
          {formError && (
            <Message variant="danger" fixed>
              {formError}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Payment/Product Name*</Form.Label>
              <Form.Control
                type="text"
                value={paymentName}
                onChange={(e) =>
                  handleFieldChange("paymentName", e.target.value)
                }
                placeholder="Enter payment or product name"
                className="rounded py-2 mb-2"
                required
                maxLength={30}
              />
              <Form.Text className="text-danger">{paymentNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Currency*</Form.Label>
              <Row className="py-2">
                <Col>
                  <Select
                    value={{ value: currency, label: currency }}
                    onChange={(selectedOption) =>
                      handleFieldChange("currency", selectedOption.value)
                    }
                    options={mainCurrencyChoices?.map((type) => ({
                      value: type[0],
                      label: type[1],
                    }))}
                  />
                </Col>
              </Row>

              <Form.Text className="text-danger">{currencyError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Amount*</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => handleFieldChange("amount", e.target.value)}
                placeholder="Enter amount"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{amountError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Row className="py-2">
                <Col md={10}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={qty}
                    onChange={(e) => handleFieldChange("qty", e.target.value)}
                    placeholder="Enter quantity in stock"
                    className="rounded py-2 mb-2"
                    required
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleQtyUnitModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Units of the items available in stock which are to be checked out."
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
                        Units of the items available in stock which are to be
                        checked out. Set between 1 and 10,000 units or
                        quantities. Default is 1 unit.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="py-2">
                <Col md={10}>
                  <Form.Check
                    type="checkbox"
                    label="Show Quantity?"
                    checked={showQty}
                    onChange={(e) =>
                      handleFieldChange("showQty", e.target.checked)
                    }
                    className="rounded py-2 mb-2"
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleQtyModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Whether to allow buyers select units of the items to be paid."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal show={showQtyModal} onHide={handleQtyModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Show Quantity Info
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Whether to allow buyers select units of the items to be
                        paid.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="py-2">
                <Col md={10}>
                  <Form.Check
                    type="checkbox"
                    label="Show Promise Option?"
                    checked={showPromiseOption}
                    onChange={(e) =>
                      handleFieldChange("showPromiseOption", e.target.checked)
                    }
                    className="rounded py-2 mb-2"
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handlePromiseModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Whether to show the Card payment option for payment checkout."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal
                    show={showPromiseModal}
                    onHide={handlePromiseModalClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Paysofter Promise Option Info
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Whether to show the Promise payment option (default:
                        checked). If all other options are unchecked then
                        Paysofter Promise payment option defaults to true.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="py-2">
                <Col md={10}>
                  <Form.Check
                    type="checkbox"
                    label="Show Card Option?"
                    checked={showCardOption}
                    onChange={(e) =>
                      handleFieldChange("showCardOption", e.target.checked)
                    }
                    className="rounded py-2 mb-2"
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleCardModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Whether to show the Card payment option for payment checkout."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal show={showCardModal} onHide={handleCardModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Paysofter Card Option Info
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Whether to show the Card payment option.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="py-2">
                <Col md={10}>
                  <Form.Check
                    type="checkbox"
                    label="Show Fund Option?"
                    checked={showFundOption}
                    onChange={(e) =>
                      handleFieldChange("showFundOption", e.target.checked)
                    }
                    className="rounded py-2 mb-2"
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleFundModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Whether to show the Fund payment option for payment checkout."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal show={showFundModal} onHide={handleFundModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Account Fund Option Info
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Whether to show the Fund payment option.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="py-2">
                <Col md={10}>
                  <Form.Check
                    type="checkbox"
                    label="Show Buyer Name?"
                    checked={showBuyerName}
                    onChange={(e) =>
                      handleFieldChange("showBuyerName", e.target.checked)
                    }
                    className="rounded py-2 mb-2"
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleBuyerNameModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Whether to show the buyer name during checkout for referencing."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal
                    show={showBuyerNameModal}
                    onHide={handleBuyerNameModalClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Show Buyer Name Info
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Whether to collect the buyer's name during checkout.
                        Although it is optional to the buyer if checked.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Row className="py-2">
                <Col md={10}>
                  <Form.Check
                    type="checkbox"
                    label="Show Buyer Phone?"
                    checked={showBuyerPhone}
                    onChange={(e) =>
                      handleFieldChange("showBuyerPhone", e.target.checked)
                    }
                    className="rounded py-2 mb-2"
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleBuyerPhoneModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Whether to cellect the buyer phone number during checkout for referencing."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal
                    show={showBuyerPhoneModal}
                    onHide={handleBuyerPhoneModalClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Show Buyer Phone Info
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Whether to collect the buyer's phone number during
                        checkout. It is optional to the buyer.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image", e.target.files[0])}
                placeholder="Upload Product Image"
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description*</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Type your message"
                rows={2}
                value={description}
                maxLength={140}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
              ></Form.Control>
              {/* <ReactQuill
                value={description}
                onChange={(value) => handleFieldChange("description", value)}
                placeholder="Enter payment/product description"
                className="rounded py-2 mb-2"
                modules={modules}
                formats={formats}
                maxLength={225}
                required
              /> */}
              <Form.Text className="text-danger">{descriptionError}</Form.Text>
            </Form.Group>
          </Form>
          <div className="py-2">
            <Button
              variant="primary"
              onClick={handleCreatePaymentLink}
              className="rounded py-2 mb-2 text-center w-100"
              disabled={loading || success}
            >
              <div className="d-flex justify-content-center">
                <span className="py-1">Create Paysofter Link</span>
                {loading && <LoaderButton />}
              </div>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePaymentLink;
