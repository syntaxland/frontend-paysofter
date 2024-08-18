// DeletePaymentLink.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import { deletePaymentLink } from "../../redux/actions/paymentActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function DeletePaymentLink({ linkId, linkName }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const deletePaymentLinkState = useSelector(
    (state) => state.deletePaymentLinkState
  );
  const { loading, success, error } = deletePaymentLinkState;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const linkData = {
    pk: linkId,
  };
  console.log("linkData:", linkData);

  const handleDeleteLink = () => {
    dispatch(deletePaymentLink(linkData));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col md={8}>
          {loading && <Loader />}
          {success && (
            <Message variant="success">
              Link{" "}
              <b>
                "<i>{linkName}</i>"
              </b>{" "}
              deleted successfully.
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning"
              style={{ fontSize: "18px", color: "yellow" }}
            ></i>{" "}
            Warning! This action will delete{" "}
            <strong>
              <i>{linkName}</i>
            </strong>{" "}
            link and it is irreversible.
          </p>

          <Button
            variant="danger"
            onClick={handleDeleteLink}
            className="rounded mt-2 text-center w-100"
            disabled={loading}
          >
            Delete Link
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DeletePaymentLink;
