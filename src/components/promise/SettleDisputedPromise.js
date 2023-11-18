// SettleDisputedPromise.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import { buyerConfirmPromise } from "../../redux/actions/PromiseActions";
import { createTransaction } from "../../redux/actions/transactionActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function SettleDisputedPromise({ promiseId, amount }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const buyerConfirmPromiseState = useSelector(
    (state) => state.buyerConfirmPromiseState
  );
  const { success, error, loading } = buyerConfirmPromiseState;

  const transactionData = {
    payment_id: promiseId,
    amount: amount,
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(createTransaction(transactionData));
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  const promiseData = {
    promise_id: promiseId,
  };
  console.log("promiseId:", promiseId);

  const handleSettleDisputedPromise = () => {
    dispatch(buyerConfirmPromise(promiseData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {/* <h2 className="mb-4">Toggle Account Fund</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">Promise confirmed successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning"
              style={{ fontSize: "18px", color: "yellow" }}
            ></i>{" "}
            Warning! This action will open a support ticket for this Promise ID
            to resolve whatever conflict arising from this promise order
            fulfilment. Note that charges apply.
          </p>

          <Button
            variant="primary"
            onClick={handleSettleDisputedPromise}
            className="rounded mt-2 text-center w-100"
            disabled
          >
            Resolve Conflict
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SettleDisputedPromise;
