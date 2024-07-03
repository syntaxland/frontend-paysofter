// Paysofter.js
import React, { 
  // useState, 
  useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { useSelector, 
  // useDispatch
 } from "react-redux";
import FundAccountButton from "./FundAccountButton";
import { formatAmount } from "../FormatAmount";
import Loader from "../Loader";
import Message from "../Message";
// import "./Paysofter.css";

function Paysofter({ amount, currency, paysofterPublicKey }) {
  // const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const userEmail = userInfo.email;

  const fundAccountState = useSelector((state) => state.fundAccountState);
  const { loading, 
    // success, 
    error } = fundAccountState;

  // const [showPaymentModal, setShowPaymentModal] = useState(false);

  // const createdAt = new Date().toISOString();

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col>
            <h1 className="text-center py-3">Paysofter Payment Option</h1>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            <ListGroup variant="flush">
              <ListGroup.Item>Amount: {formatAmount(amount)} {currency}</ListGroup.Item>
            </ListGroup>

            <div>
              <FundAccountButton
                // showPaymentModal={showPaymentModal}
                // setShowPaymentModal={setShowPaymentModal}
                userEmail={userEmail}
                amount={amount}
                currency={currency}
                publicApiKey={paysofterPublicKey}
              />
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default Paysofter;
