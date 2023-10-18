// ApiEndPoints.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Form, Button, Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function ApiEndPoints() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("profile:", profile);

  const history = useHistory();

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center">
        <i className="fas fa-code"></i> Api EndPoints & Keys
        </h2>

        {profileLoading && <Loader />}

        {profileError && <Message variant="danger">{profileError}</Message>}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Test API keys</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <div className="text-center py-2">
                    <h2></h2>
                  </div>
                  <Col>Test API Public key: {profile.test_api_key}</Col>
                  <Col>Test Secret Key: {profile.test_api_secret_key}</Col>
                  <div className="text-center py-2">
                    <h2></h2>
                  </div>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Live API keys</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Live API Public Key: {profile.live_api_key}</Col>
                  <Col>Live API Secret Key: {profile.live_api_secret_key}</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default ApiEndPoints;
