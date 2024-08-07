// DocumentationScreen.js
import React from "react";
import { Row, Col, Container, Accordion } from "react-bootstrap";

function DocumentationScreen() {
  const handlePaysofterReactNpm = () => {
    window.location.href = "https://www.npmjs.com/package/react-paysofter/";
  };

  const handlePaysofterReactGithub = () => {
    window.location.href = "https://github.com/paysofter/react-paysofter/";
  };

  const handlePaysofterReactNativeNpm = () => {
    window.location.href = "https://www.npmjs.com/package/react-native-paysofter/";
  };

  const handlePaysofterReactNativeGithub = () => {
    window.location.href = "https://github.com/paysofter/react-native-paysofter/";
  };

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center py-3">
          <i className="fas fa-code"></i> Documentation, SDK, Webhooks and
          Integrations
        </h2>

        <Col>
          <Accordion defaultActiveKey={["1"]} alwaysOpen>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ReactJS Integrations</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <p>
                      <h3>React Paysofter</h3>
                      <p>
                        {" "}
                        This is a ReactJS package for integrating Paysofter
                        payment gateway into your ReactJS application.{" "}
                      </p>
                      <h3> Installation</h3>
                      <p>To install the package, run: </p>
                      <i>npm install react-paysofter </i>
                    </p>
                    <p
                      onClick={handlePaysofterReactNpm}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      See Doc at NPM
                    </p>

                    <p
                      onClick={handlePaysofterReactGithub}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      Github{" "}
                    </p>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>React Native Integration</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <p>
                      <h3>React Native Paysofter</h3>
                      <p>
                        {" "}
                        This is a React Native package for integrating Paysofter
                        payment gateway into your React Native andriod and iOS
                        applications.
                      </p>
                      <h3> Installation</h3>
                      <p>To install the package, run: </p>
                      <i>npm install react-native-paysofter </i>
                    </p>
                    <p
                      onClick={handlePaysofterReactNativeNpm}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      See Doc at NPM
                    </p>

                    <p
                      onClick={handlePaysofterReactNativeGithub}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      Github{" "}
                    </p>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>JavaScript</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Venila JavaScript (+HTML5)</Col>
                  <Col>Vue</Col>
                  <Col>Angular</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Python</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <div className="text-center "></div>
                  <Col>Django</Col>
                  <Col>Flask</Col>
                  <div className="text-center "></div>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Mobile Apps</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <h5 className="text-center py-2">Andriod</h5>

                  <Row>
                    <Col>Flutter</Col>
                  </Row>

                  <h5 className="text-center py-2">IOS</h5>

                  <Row>
                    <Col>Swift</Col>
                  </Row>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>PHP</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Wordpress</Col>
                  <Col>Laravel</Col>
                  <Col>Joomla</Col>
                  <Col>Prestashop</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>Java</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Spring</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>Ruby</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Rail</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>C#</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>ASP.Net</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default DocumentationScreen;
