// PaysofterPromise.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col, Modal, Container } from "react-bootstrap";
import { getBuyerPromises } from "../../redux/actions/PromiseActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import BuyerConfirmPromise from "../promise/BuyerConfirmPromise";

function PaysofterPromise({ history }) {
  const dispatch = useDispatch();

  const getBuyerPromiseState = useSelector(
    (state) => state.getBuyerPromiseState
  );
  const { loading, promises, error } = getBuyerPromiseState;
  console.log("Promises:", promises);

  // const getSellerPromiseState = useSelector((state) => state.getSellerPromiseState);
  // const { loading, promises, error } = getSellerPromiseState;
  // console.log("Promises:", promises);

  const [showConfirmPromise, setShowConfirmPromise] = useState(false);
  const [selectedPromiseId, setSelectedPromiseId] = useState(null);

  const handleConfirmPromiseOpen = (promiseId) => {
    setSelectedPromiseId(promiseId);
    setShowConfirmPromise(true);
  };

  const handleConfirmPromiseClose = () => {
    setShowConfirmPromise(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promises?.slice(indexOfFirstItem, indexOfLastItem);

  const formatAccountId = (accountId) => {
    const accountIdStr = String(accountId);

    if (accountIdStr.length < 8) {
      return accountIdStr;
    } else {
      const maskedPart =
        "*".repeat(accountIdStr.length - 4) + accountIdStr.slice(-4);
      return maskedPart;
    }
  };

  useEffect(() => {
    dispatch(getBuyerPromises());
  }, [dispatch]);

  const handleMessageSeller = () => {
    history.push("/message-seller");
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="text-center py-3">
            <i className="fas fa-money-check-alt"></i> Buyer Promises
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">Promises appear here.</div>
              ) : (
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="table-sm py-2 rounded"
                >
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Promise ID</th>
                      <th>Amount</th>
                      <th>Seller Account ID</th>
                      <th>Seller Email</th>
                      <th>Buyer Account ID</th>
                      <th>Buyer Email</th>
                      <th>Buyer Promise Fulfilled</th>
                      <th>Seller Fulfilled Promise</th>
                      <th>Payment Method</th>
                      <th>payment Provider</th>
                      <th>Status</th>
                      <th>Successful</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((promise, index) => (
                      <tr key={promise.id} className="rounded">
                        <td>{index + 1}</td>
                        <td>
                          {promise.buyer_promise_fulfilled ? (
                            <span>
                              <Button variant="outline-link" size="sm" disabled>
                                {promise.promise_id}
                              </Button>
                            </span>
                          ) : (
                            <span>
                              <Button
                                variant="outline-link"
                                size="sm"
                                // onClick={handleConfirmPromiseOpen}
                                onClick={() =>
                                  handleConfirmPromiseOpen(promise.promise_id)
                                }
                              >
                                {promise.promise_id}
                              </Button>
                            </span>
                          )}
                        </td>

                        <td>
                          {promise.buyer_promise_fulfilled ? (
                            <span style={{ fontSize: "16px", color: "green" }}>
                              {promise.currency}{" "}
                              {promise.amount?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          ) : (
                            <span style={{ fontSize: "16px", color: "yellow" }}>
                              {promise.currency}{" "}
                              {promise.amount?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          )}
                        </td>

                        <td>{formatAccountId(promise.seller_account_id)}</td>
                        <td>{promise.seller_email}</td>
                        <td>{formatAccountId(promise.buyer_account_id)}</td>
                        <td>{promise.buyer_email}</td>
                        <td>
                          {promise.buyer_promise_fulfilled ? (
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
                          {promise.seller_fulfilled_promise ? (
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
                        <td>{promise.payment_method}</td>
                        <td>{promise.payment_provider}</td>
                        <td>{promise.status}</td>
                        <td>
                          {promise.is_success ? (
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
                          {new Date(promise.timestamp).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </td>

                        <td>
                          {promise.buyer_promise_fulfilled ? (
                            <span>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                // onClick={handleAddbusiness}
                                disabled
                              >
                                Promise Confirmed
                              </Button>
                            </span>
                          ) : (
                            <span>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                // onClick={handleConfirmPromiseOpen}
                                onClick={() =>
                                  handleConfirmPromiseOpen(promise.promise_id)
                                }
                              >
                                Confirm Promise
                              </Button>
                            </span>
                          )}
                        </td>

                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={handleMessageSeller}
                          >
                            Message Seller
                          </Button>
                        </td>

                        <Modal
                          show={showConfirmPromise}
                          onHide={handleConfirmPromiseClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                              Confirm Promise
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {showConfirmPromise && (
                              <BuyerConfirmPromise
                                promiseId={selectedPromiseId}
                              />
                            )}
                          </Modal.Body>
                        </Modal>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={promises.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PaysofterPromise;