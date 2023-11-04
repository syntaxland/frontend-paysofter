// HomeScreen.js
import React from "react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
// import Product from "../Product";
// import { listProducts } from "../../actions/productAction";
// import Loader from "../Loader";
// import Message from "../Message";
// import PromoProductScroll from "../PromoProductScroll";

function HomeScreen({ history }) {
  // const dispatch = useDispatch();

  return (
    <div>
      <Row>
        <Col>
          <div className="text-center">
            <hr />
            <h1 className="py-3">Your Softer Experience</h1>
            <hr />
            {/* <PromoProductScroll /> */}
            <span>
              Although we know many SOFT ways of doing things and making
              payments, there's yet a SOFTER way of going about it.{" "}
            </span>
            <Button
              variant="primary"
              className="rounded"
              size="sm"
              onClick={() => history.push("/register")}
            >
              Create A Free Account <i className="fas fa-sign-in"></i>
            </Button>
          </div>

          <div className="text-center">
            <hr />
            <h1 className="py-3">Our Experience</h1>
            <hr />
            {/* <PromoProductScroll /> */}
            <span>
              While asleep or active with work, Paysofter work and passively
              earn on your behalf ...{" "}
            </span>
            <Button
              variant="primary"
              className="rounded"
              size="sm"
              onClick={() => history.push("/register")}
            >
              Register <i className="fas fa-sign-in"></i>
            </Button>
          </div>

          <div className="text-center">
            <hr />
            <h1 className="py-3">Holding Your Hands</h1>
            <hr />
            {/* <PromoProductScroll /> */}
            <span>
              Here comes a system that rewards and gives credit points to every
              transaction payment effort... Don't have a Paysofter account?
              You're just about 3 minutes away! Sign up for a much softer
              payment experience. A gateway built for all humans!{" "}
            </span>
            <Button
              variant="primary"
              className="rounded"
              size="sm"
              onClick={() => history.push("/register")}
            >
              Sign up <i className="fas fa-sign-in"></i>
            </Button>
          </div>

          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
