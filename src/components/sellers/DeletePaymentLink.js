// DeletePaymentLink.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { deletePaymentLink } from "../../redux/actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";


function DeletePaymentLink() {
  const dispatch = useDispatch();
  const history = useHistory();


  const deletePaymentLinkState = useSelector(
    (state) => state.deletePaymentLinkState
  );
  const { loading , success , error  } = deletePaymentLinkState;


  useEffect(() => {
    dispatch(getSellerPaymentLinks());
  }, [dispatch]);


  const handleCreatePaymentLink = () => {
    history.push("/create-payment-link/");
  };

  // const handleCreatePaymentLink = () => {
  //   history.push("/create-payment-link/");
  // };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          <div>
            <h1 className="text-center py-3">
              <FontAwesomeIcon icon={faQrcode} /> Delete Link
            </h1>
            <div className="text-center py-1">Company Logo</div>
            


          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DeletePaymentLink;
