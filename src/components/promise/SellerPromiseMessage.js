// SellerPromiseMessage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  sellerCreatePromiseMessage,
  listSellerPromiseMessages,
} from "../../redux/actions/PromiseActions";
import Loader from "../Loader";
import Message from "../Message";

function SellerPromiseMessage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const sellerCreatePromiseMessageState = useSelector(
    (state) => state.sellerCreatePromiseMessageState
  );
  const { loading, success, error } = sellerCreatePromiseMessageState;

  const listSellerPromiseMessagesState = useSelector(
    (state) => state.listSellerPromiseMessagesState
  );
  const { sellerPromiseMessages } = listSellerPromiseMessagesState;
  console.log("sellerPromiseMessages:", sellerPromiseMessages);

  useEffect(() => {
    const promiseId = id;
    dispatch(listSellerPromiseMessages(promiseId));
  }, [dispatch, id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();

    const promiseMessageData = {
      promise_id: id,
      message: message,
    };

    dispatch(sellerCreatePromiseMessage(promiseMessageData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        window.location.reload();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div>
      <div>
        <Row className="d-flex justify-content-center">
          <Col className="border rounded p-4 bg-dark" xs={10} md={10}>
            {/* <h1 className="text-center py-3"> Promise Messages</h1> */}
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {/* {success && (
              <Message variant="success">Message sent successfully.</Message>
            )} */}

            <h2 className="border rounded p-4 py-2 text-center text-white">
              Promise ID: {id}
            </h2>

            {sellerPromiseMessages?.map((message) => (
              <div
                className={`${
                  message.buyer
                    ? "d-flex justify-content-left"
                    : "d-flex justify-content-end"
                }`}
                style={{ maxWidth: "75%" }}
              >
                <div>
                  <div key={message.id}>
                    <div
                      className={`border rounded p-3 my-2 ${
                        message.buyer
                          ? "bg-light"
                          : "bg-success justify-content-end"
                      }`}
                      // style={{ maxWidth: "75%" }}
                    >
                      <p>
                        User:{" "}
                        {message.buyer_username
                          ? message.buyer_username?.charAt(0).toUpperCase() +
                            message.buyer_username?.slice(1)
                          : message.seller_username?.charAt(0).toUpperCase() +
                            message.seller_username?.slice(1)}
                      </p>
                      <p>Message: {message.message}</p>
                      <p>
                        Timestamp:{" "}
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <ul
              className="py-2"
              // style={{ backgroundColor: "rgba(40, 167, 69, 0.1)" }}
            >
              {sellerPromiseMessages?.map((message) => (
                <li
                  key={message.id}
                  className={`border rounded p-4 py-2 mb-2 ${
                    message.seller
                      ? "bg-light"
                      : "bg-success justify-content-end"
                  }`}
                  // style={{ justifyContent: message.buyer ? "flex-start" : "flex-end", width: message.seller ? "auto" : "75%" }}
                  // style={{ borderRadius: message.seller ? "20px 20px 20px 0" : "20px 20px 0 20px" }}
                >
                  <div
                    className={`border rounded p-3 ${
                      message.seller ? "bg-light" : "bg-success text-white"
                    }`}
                    style={{ maxWidth: "75%" }}
                  >
                    <p>
                      User:{" "}
                      {message.buyer_username
                        ? message.buyer_username?.charAt(0).toUpperCase() +
                          message.buyer_username?.slice(1)
                        : message.seller_username?.charAt(0).toUpperCase() +
                          message.seller_username?.slice(1)}
                    </p>
                    <p>Message: {message.message}</p>
                    <p>
                      Timestamp: {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul> */}

            <Form onSubmit={handleSubmitReply}>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Type your message"
                  rows={2}
                  value={message}
                  maxLength={1000}
                  onChange={(e) => setMessage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className="py-2">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="primary"
                >
                  Submit
                </Button>
              </div>
              {success && (
                <Message variant="success">Message sent successfully.</Message>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SellerPromiseMessage;
