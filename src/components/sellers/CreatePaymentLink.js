// CreatePaymentLink.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  // Modal
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createPaymentLink } from "../../redux/actions/paymentActions";
// import { getUserProfile } from "../../redux/actions/userProfileActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
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

  // const userProfile = useSelector((state) => state.userProfile);
  // const { profile } = userProfile;

  // useEffect(() => {
  //   dispatch(getUserProfile());
  // }, [dispatch]);

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

  const [showPromiseOption, setShowPromiseOption] = useState(true);
  const [showFundOption, setShowFundOption] = useState(false);
  const [showCardOption, setShowCardOption] = useState(false);
  const [showBuyerName, setShowBuyerName] = useState(false);
  const [showBuyerPhone, setShowBuyerPhone] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [image, setImage] = useState("");

  const [formError, setFormError] = useState("");

  // const modules = {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }, { font: [] }],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["bold", "italic", "underline"],
  //     [{ align: [] }],
  //     ["link", "image"],
  //     ["clean"],
  //   ],
  // };

  // const formats = [
  //   "header",
  //   "font",
  //   "list",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "align",
  //   "link",
  //   "image",
  // ];

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
  sellerData.append("description", description);
  sellerData.append("show_promise_option", showPromiseOption);
  sellerData.append("show_fund_option", showFundOption);
  sellerData.append("show_card_option", showCardOption);
  sellerData.append("show_buyer_name", showBuyerName);
  sellerData.append("show_buyer_phone", showBuyerPhone);
  sellerData.append("payment_image", image);

  console.log("sellerData:", sellerData);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/payment-links/");
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
          <h2 className="text-center py-2">Create Payment Link</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Payment link created successfully.
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
                placeholder="Enter payment/product name"
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
              <Form.Check
                type="checkbox"
                label="Show Promise Option?"
                checked={showPromiseOption}
                onChange={(e) =>
                  handleFieldChange("showPromiseOption", e.target.checked)
                }
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Card Option?"
                checked={showCardOption}
                onChange={(e) =>
                  handleFieldChange("showCardOption", e.target.checked)
                }
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Fund Option?"
                checked={showFundOption}
                onChange={(e) =>
                  handleFieldChange("showFundOption", e.target.checked)
                }
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Buyer Name?"
                checked={showBuyerName}
                onChange={(e) =>
                  handleFieldChange("showBuyerName", e.target.checked)
                }
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Buyer Phone?"
                checked={showBuyerPhone}
                onChange={(e) =>
                  handleFieldChange("showBuyerPhone", e.target.checked)
                }
                className="rounded py-2 mb-2"
              />
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
                onChange={(e) => handleFieldChange("description", e.target.value)}
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
                <span className="py-1">Create Payment Link</span>
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
