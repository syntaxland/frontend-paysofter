// HomeScreen.js
import React from "react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "react-bootstrap";
// import Product from "../Product";
// import { listProducts } from "../../actions/productAction";
// import Loader from "../Loader";
// import Message from "../Message";
// import PromoProductScroll from "../PromoProductScroll";

function HomeScreen({ history }) {
  // const dispatch = useDispatch();

  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center">
            <hr />
            <h1 className="py-3">Your Softer Experience</h1>
            <hr />
            {/* <PromoProductScroll /> */}
            <span>
              {/* Although we know many SOFT ways of doing things and making
              payments, there's yet a SOFTER way of going about it. */}
              In the realm of SOFT ways of doing things, seamless transactions
              and convenient payments, there exists yet a SOFTER way of going
              about it at a level of sophistication beyond the ordinary.{" "}
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
            <h1 className="py-3">Selling Point</h1>
            <hr />
            {/* <PromoProductScroll /> */}
            <span>
              {/* Wearied of never ending clause: "pay on delivery" between sellers
              and buyers and the mistrust that ensues? Paysofter Promise fills
              in this gap! With Paysofter Promise option, the payment made to a
              seller (using the buyer's funded Paysofter Account Fund) is
              escrowed or placed in custody until a specified condition between
              the buyer and seller is fulfilled.  */}
              Tired of the persistent uncertainty surrounding the 'pay on
              delivery' scenario between sellers and buyers, coupled with the
              resulting lack of trust? Paysofter Promise fills in this gap!
              Through the Paysofter Promise feature, payments made to a seller
              (utilizing the buyer's funded Paysofter Account) are securely held
              in escrow until specified conditions, agreed upon by both buyer
              and seller, are met.
            </span>
            <Button
              variant="primary"
              className="rounded"
              size="sm"
              onClick={() => history.push("/register")}
            >
              Open A Free Account <i className="fas fa-sign-in"></i>
            </Button>
          </div>

          <div className="text-center">
            <hr />
            <h1 className="py-3">Our Distinctive Approach</h1>
            {/* <h1 className="py-3">Our Experience</h1> */}
            <hr />
            {/* <PromoProductScroll /> */}
            <span>
              {/* While asleep, Paysofter actively works for you. Active with work?
              Paysofter passively earns on your behalf rewarding your past
              endeavours... */}
              Even when you're in asleep, Paysofter is actively working for you.
              Engrossed in your daily tasks? Paysofter effortlessly generates
              earnings on your behalf, acknowledging your past accomplishments.{" "}
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
            {/* <h1 className="py-3">Guiding You Every Step</h1> */}
            <h1 className="py-3">Holding Your Hands</h1>
            <hr />
            {/* <PromoProductScroll /> */}
            <span>
              {/* Here comes a system that rewards and gives credit points to every
              transaction payment effort... Don't have a Paysofter account?
              You're just about 3 minutes away! Sign up for a much softer
              payment experience. A gateway built for all humans! */}
              Here comes  a system that recognizes and awards credit points for
              each transactional effort. Don't possess a Paysofter account yet?
              You're merely three minutes away! Embark on a journey towards a
              remarkably smoother payment experience. A gateway crafted for
              every individual!"{" "}
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
    </Container>
  );
}

export default HomeScreen;
