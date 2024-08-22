// EditPaymentLink.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  updatePaymentLink,
  getPaymentLinkDetail,
} from "../../redux/actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import { MAIN_CURRENCY_CHOICES } from "../constants";

function EditPaymentLink({ linkId, linkName, sellerUsername }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [mainCurrencyChoices, setMainCurrencyChoices] = useState([]);

  useEffect(() => {
    setMainCurrencyChoices(MAIN_CURRENCY_CHOICES);
  }, []);

  const getPaymentLinkDetailState = useSelector(
    (state) => state.getPaymentLinkDetailState
  );
  const { paymentLinks } = getPaymentLinkDetailState;
  console.log("paymentLinks:", paymentLinks);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    const linkData = {
      link_id: linkId,
      seller_username: sellerUsername,
    };
    dispatch(getPaymentLinkDetail(linkData));
  }, [dispatch, linkId, sellerUsername]);

  const updatePaymentLinkState = useSelector(
    (state) => state.updatePaymentLinkState
  );
  const { success, error, loading } = updatePaymentLinkState;

  const [editLinkChanges, setEditLinkChanges] = useState(false);
  const [editLinkData, setEditLinkData] = useState({
    payment_name: "",
    currency: "",
    amount: "",
    qty: "",
    show_qty: "",
    show_promise_option: "",
    show_fund_option: "",
    show_card_option: "",
    show_buyer_name: "",
    show_buyer_phone: "",
    payment_image: "",
    description: "",
  });

  useEffect(() => {
    if (paymentLinks) {
      setEditLinkData({
        payment_name: paymentLinks?.payment_name,
        currency: paymentLinks?.currency,
        amount: paymentLinks?.amount,
        qty: paymentLinks?.qty,
        show_qty: paymentLinks?.show_qty,
        show_promise_option: paymentLinks?.show_promise_option,
        show_fund_option: paymentLinks?.show_fund_option,
        show_card_option: paymentLinks?.show_card_option,
        show_buyer_name: paymentLinks?.show_buyer_name,
        show_buyer_phone: paymentLinks?.show_buyer_phone,
        payment_image: paymentLinks?.payment_image,
        description: paymentLinks?.description,
      });
      setEditLinkChanges(false);
    }
  }, [paymentLinks]);

  const handleEditLinkChanges = (e) => {
    const { name, value, files, checked } = e.target;

    if (
      name === "show_promise_option" ||
      name === "show_fund_option" ||
      name === "show_card_option" ||
      name === "show_buyer_name" ||
      name === "show_buyer_phone"
    ) {
      setEditLinkData({ ...editLinkData, [name]: checked });
    } else if (files) {
      setEditLinkData({ ...editLinkData, [name]: files[0] });
    } else {
      setEditLinkData({ ...editLinkData, [name]: value });
    }

    setEditLinkChanges(true);
  };

  const handleEditLink = () => {
    const editLinkFormData = new FormData();
    editLinkFormData.append("payment_name", editLinkData.payment_name);
    editLinkFormData.append("currency", editLinkData.currency);
    editLinkFormData.append("amount", editLinkData.amount);
    editLinkFormData.append("qty", editLinkData.qty);
    editLinkFormData.append("show_qty", editLinkData.show_qty);
    editLinkFormData.append(
      "show_promise_option",
      editLinkData.show_promise_option
    );
    editLinkFormData.append("show_fund_option", editLinkData.show_fund_option);
    editLinkFormData.append("show_card_option", editLinkData.show_card_option);
    editLinkFormData.append("show_buyer_name", editLinkData.show_buyer_name);
    editLinkFormData.append("show_buyer_phone", editLinkData.show_buyer_phone);

    editLinkFormData.append("description", editLinkData.description);
    editLinkFormData.append("link_id", linkId);

    if (editLinkFormData.payment_image instanceof File) {
      editLinkFormData.append("payment_image", editLinkData.payment_image);
    }

    console.log("editLinkFormData:", editLinkFormData);

    dispatch(updatePaymentLink(editLinkFormData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col xs={12} md={6}>
          {/* <h2 className="text-center py-2">Edit Link</h2> */}
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              The{" "}
              <strong>
                "<i>{linkName}</i>"
              </strong>{" "}
              link updated successfully.
            </Message>
          )}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Product Name*</Form.Label>
              <Form.Control
                type="text"
                name="payment_name"
                value={editLinkData?.payment_name}
                onChange={handleEditLinkChanges}
                placeholder="Enter the payment name"
                className="rounded py-2 mb-2"
                required
                maxLength={30}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Currency*</Form.Label>
              <Form.Control
                as="select"
                name="currency"
                value={editLinkData?.currency}
                onChange={handleEditLinkChanges}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Currency</option>
                {mainCurrencyChoices?.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Amount*</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={editLinkData?.amount}
                onChange={handleEditLinkChanges}
                placeholder="Enter amount"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="qty"
                value={editLinkData?.qty}
                onChange={handleEditLinkChanges}
                placeholder="Enter qty"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Quantity?"
                name="show_qty"
                checked={editLinkData.show_qty}
                onChange={handleEditLinkChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Promise Option?"
                name="show_promise_option"
                checked={editLinkData.show_promise_option}
                onChange={handleEditLinkChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Card Option?"
                name="show_card_option"
                checked={editLinkData.show_card_option}
                onChange={handleEditLinkChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Fund Option?"
                name="show_fund_option"
                checked={editLinkData.show_fund_option}
                onChange={handleEditLinkChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Buyer Name?"
                name="show_buyer_name"
                checked={editLinkData.show_buyer_name}
                onChange={handleEditLinkChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Buyer Phone?"
                name="show_buyer_phone"
                checked={editLinkData.show_buyer_phone}
                onChange={handleEditLinkChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Image</Form.Label>
              <div className="py-2">
                {paymentLinks?.payment_image && (
                  <img
                    src={paymentLinks?.payment_image}
                    alt="Link"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                name="payment_image"
                onChange={handleEditLinkChanges}
                placeholder="Upload the ID Card Photoname"
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={editLinkData?.description}
                onChange={handleEditLinkChanges}
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                required
                maxLength={150}
              />
            </Form.Group>
          </Form>
          <div className="py-2">
            <Button
              variant="success"
              onClick={handleEditLink}
              className="rounded py-2 mb-2 text-center w-100"
              disabled={!editLinkChanges || loading || success}
            >
              <div className="d-flex justify-content-center">
                <span className="py-1">Update Link</span>
                {loading && <LoaderButton />}
              </div>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditPaymentLink;
