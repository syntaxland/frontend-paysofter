// GetNgnAccountFundBalance.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { getUserAccountFundBalance } from "../../redux/actions/AccountFundActions";
import ToggleAccountSettings from "../settings/ToggleAccountSettings";
import FundAccount from "./FundAccount";
import { formatAmount } from "../FormatAmount";

const GetNgnAccountFundBalance = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { loading, error, accountFundBalance } = userAccountBalanceState;
  console.log("NGN accountFundBalance:", accountFundBalance);

  const [showToggleAccountSettings, setShowToggleAccountSettings] =
    useState(false);

  const [showDisableAccountSettings, setShowDisableAccountSettings] =
    useState(false);

  const [showFundAccount, setShowFundAccount] = useState(false);

  const handleFundAccountOpen = () => {
    setShowFundAccount(true);
  };

  const handleFundAccountClose = () => {
    setShowFundAccount(false);
  };
  const handleToggleFundOpen = () => {
    setShowToggleAccountSettings(true);
  };

  const handleDisableFundOpen = () => {
    setShowDisableAccountSettings(true);
  };

  const handleDisableFundClose = () => {
    setShowDisableAccountSettings(false);
  };

  const handleToggleFundClose = () => {
    setShowToggleAccountSettings(false);
  };

  useEffect(() => {
    dispatch(getUserAccountFundBalance());
  }, [dispatch]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Col>
            <Row>
              <Col>
                <h2 className="py-2">
                  <i className="fas fa-wallet"></i> Account Fund Wallet (NGN)
                </h2>{" "}
                <strong>Staus:</strong>{" "}
                {accountFundBalance?.is_diabled ? (
                  <>
                    <span className="py-2">
                      <Button
                        variant="outline-transparent"
                        onClick={handleDisableFundOpen}
                        className="rounded"
                        size="sm"
                        title="Account Fund is currently disabled. Please contact support."
                      >
                        <i
                          className="fas fa-lock"
                          style={{ fontSize: "16px", color: "red" }}
                        ></i>{" "}
                        Disabled
                      </Button>
                    </span>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline-transparent"
                      onClick={handleToggleFundOpen}
                      className="rounded"
                      size="sm"
                      title="Set Account Fund active or locked."
                    >
                      {accountFundBalance?.is_active ? (
                        <>
                          <i
                            className="fas fa-lock-open"
                            style={{
                              fontSize: "16px",
                              color: "green",
                            }}
                          ></i>{" "}
                          Active
                        </>
                      ) : (
                        <>
                          <i
                            className="fas fa-lock text-warning"
                            style={{
                              fontSize: "16px",
                              // color: "yellow",
                            }}
                          ></i>{" "}
                          Locked
                        </>
                      )}
                    </Button>
                  </>
                )}
              </Col>

              <Modal show={showFundAccount} onHide={handleFundAccountClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-center w-100 py-2">
                    Fund Account
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>{showFundAccount && <FundAccount />}</Modal.Body>
              </Modal>

              <Modal
                show={showToggleAccountSettings}
                onHide={handleToggleFundClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="text-center w-100 py-2">
                    Toggle Account Fund Status
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {showToggleAccountSettings && <ToggleAccountSettings />}
                </Modal.Body>
              </Modal>

              <Modal
                show={showDisableAccountSettings}
                onHide={handleDisableFundClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="text-center w-100 py-2">
                    Account Fund Disabled
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className="text-center  py-2">
                    Account Fund is currently disabled. Please contact support
                    for reactivation.
                  </p>
                </Modal.Body>
              </Modal>
            </Row>

            <span>Balance: </span>
            <strong>
              {
                formatAmount(accountFundBalance?.balance)

                // ?.toLocaleString(undefined, {
                //   minimumFractionDigits: 2,
                //   maximumFractionDigits: 2,
                // })
              }{" "}
              NGN
            </strong>

            <div className="py-3">
              <Button
                variant="primary"
                onClick={handleFundAccountOpen}
                className="rounded"
              >
                Fund NGN Account
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default GetNgnAccountFundBalance;
