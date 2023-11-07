// FundAccountButton.js
import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import CardPayment from "./CardPayment";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import QrPayment from "./QrPayment";

function FundAccountButton({
  amount,
  currency,
  showFundAccountButton,
  setShowFundAccountButton,
}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  return (
    <div>
      <div className="text-center">
        <Button
          className="text-center rounded py-2"
          variant="primary"
          onClick={() => setShowFundAccountButton(true)}
        >
          <span>Pay Now</span>
        </Button>
      </div>

      <Modal
        show={showFundAccountButton}
        onHide={() => setShowFundAccountButton(false)}
      >
        <Modal.Header closeButton>
          <div className="text-center w-100 py-2">
            <Modal.Title>Mock Payment (Test)</Modal.Title>
            <div>{userInfo.email}</div>
            <div>
              NGN{" "}
              {amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {/* Left column with payment options */}
            <Col md={3}>
              <div className="text-center">
                <p>Options</p>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("card")}
                    className={selectedPaymentOption === "card" ? "active" : ""}
                  >
                    <i className="fas fa-credit-card"></i> Debit Card
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("transfer")}
                    className={
                      selectedPaymentOption === "transfer" ? "active" : ""
                    }
                  >
                    <i className="fa fa-exchange"></i> Transfer
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("bank")}
                    className={selectedPaymentOption === "bank" ? "active" : ""}
                  >
                    <i className="fas fa-bank"></i> Bank
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("ussd")}
                    className={selectedPaymentOption === "ussd" ? "active" : ""}
                  >
                    <i className="fa fa-mobile"></i> USSD
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("qr")}
                    className={selectedPaymentOption === "qr" ? "active" : ""}
                  >
                    <i className="fa fa-qrcode"></i> Visa QR
                  </Button>{" "}
                </div>
              </div>
            </Col>
            {/* Right column with selected payment option component */}
            <Col md={9}>
              {/* Conditionally render the selected payment option component */}
              {selectedPaymentOption === "card" && (
                <CardPayment
                  amount={amount}
                  currency={currency}
                  userEmail={userInfo.email}
                />
              )}
              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FundAccountButton;
