// Subscriptions.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Form, Button, Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function Subscriptions() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("profile:", profile);

  const history = useHistory();

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center">
          Subscriptions <i className="fas fa-code"></i>
        </h2>

        {profileLoading && <Loader />}

        {profileError && <Message variant="danger">{profileError}</Message>}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>CableTV</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <div className="text-center py-2">
                    <h2></h2>
                  </div>
                  <Col>DSTV</Col>
                  <Col>Star Time</Col>
                  <Col>GoTV</Col>
                  <div className="text-center py-2">
                    <h2></h2>
                  </div>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Mobile Data</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>MTN</Col>
                  <Col>GLO</Col>
                  <Col>Airtel</Col>
                  <Col>Smile</Col>
                  <Col>Star Link</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default Subscriptions;
