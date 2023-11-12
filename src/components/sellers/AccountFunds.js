// AccountFunds.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { userAccountFundList } from "../../redux/actions/AccountFundActions"; 
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

function AccountFunds() {
  const dispatch = useDispatch();

  const userAccountFundListState = useSelector((state) => state.userAccountFundListState); 
  const { loading, accountFunds, error } = userAccountFundListState;
  console.log("AccountFunds:", accountFunds);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accountFunds.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(userAccountFundList());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center py-3">
        <i className="fas fa-credit-card"></i> Account Funds
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="text-center py-3">Account funds appear here.</div>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Fund Account ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Payment Method</th>
                  <th>Payment Provider</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((accountFund, index) => (
                  <tr key={accountFund.id}>
                    <td>{index + 1}</td>
                    <td>{accountFund.fund_account_id}</td>
                    <td>
                      {/* <td>{accountFund.user_email}</td> */}
                    </td>
                    <td>{accountFund.amount}</td>
                    <td>{accountFund.currency}</td>
                    <td>{accountFund.payment_method}</td>
                    <td>{accountFund.payment_provider}</td>
                    <td>
                      {accountFund.is_success ? (
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: "16px", color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times-circle"
                          style={{ fontSize: "16px", color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {new Date(accountFund.timestamp).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={accountFunds.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default AccountFunds;
