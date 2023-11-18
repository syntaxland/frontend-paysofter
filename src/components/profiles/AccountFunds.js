// AccountFunds.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import AccountFundCredits from "../FundAccount/AccountFundCredits";
import AccountFundDebits from "../FundAccount/AccountFundDebits";

function AccountFunds() {

  return (
    <div>
      <Row>
        <Col>
        
          <hr />
          <div>
            <AccountFundCredits />
          </div>

          <hr />
          <div className="text-center">
            <AccountFundDebits />
          </div>

          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default AccountFunds;
