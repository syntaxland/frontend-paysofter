// PaymentLinks.js
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import {
  getSellerPaymentLinks,
  // deletePaymentLink
} from "../../redux/actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import { formatAmount } from "../FormatAmount";
import QRCode from "qrcode.react";

function PaymentLinks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const qrCodeRefs = useRef([]); // Store multiple refs for QR codes

  // const deletePaymentLinkState = useSelector(
  //   (state) => state.deletePaymentLinkState
  // );
  // const { loading: paymentLinkLoading , success: paymentLinkSuccess , error: paymentLinkError  } = deletePaymentLinkState;

  const getSellerPaymentLinksState = useSelector(
    (state) => state.getSellerPaymentLinksState
  );
  const { loading, paymentLinks, error } = getSellerPaymentLinksState;
  console.log("paymentLinks:", paymentLinks);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLinkCopied, setIsLinkCopied] = useState({});
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentLinks.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getSellerPaymentLinks());
  }, [dispatch]);

  const copyToClipboard = (textToCopy, id) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsLinkCopied((prev) => ({
        ...prev,
        [id]: true,
      }));
      setTimeout(() => {
        setIsLinkCopied((prev) => ({
          ...prev,
          [id]: false,
        }));
      }, 2000);
    });
  };

  const shareLink = (link) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Payment Link",
          text: "Check out this payment link!",
          url: link,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed:", error));
    } else {
      alert("Please manually share the payment link: " + link);
    }
  };

  const downloadQRCode = (index) => {
    const canvas = qrCodeRefs.current[index].querySelector("canvas");
    const qrUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "payment-link-qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareQRCode = (index) => {
    const canvas = qrCodeRefs.current[index].querySelector("canvas");
    canvas.toBlob((blob) => {
      const file = new File([blob], "payment-link-qr-code.png", {
        type: "image/png",
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator
          .share({
            files: [file],
            title: "QR Code",
            text: "Scan this QR code to make a payment!",
          })
          .catch((error) => console.error("Share failed:", error));
      } else {
        downloadQRCode(index); // Fallback to download if sharing is not supported
      }
    });
  };

  const handleCreatePaymentLink = () => {
    history.push("/create-payment-link/");
  };

  // const handleCreatePaymentLink = () => {
  //   history.push("/create-payment-link/");
  // };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          <div>
            <h1 className="text-center py-3">
              <FontAwesomeIcon icon={faQrcode} /> Payment Links
            </h1>
            <div className="text-center py-1">Company Logo</div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {currentItems.length === 0 ? (
                  <div className="text-center py-3">
                    Payment links appear here.
                  </div>
                ) : (
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Payment Name</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Show Promise Option</th>
                        <th>Show Card Option</th>
                        <th>Show Fund Option</th>
                        <th>Show Buyer Name</th>
                        <th>Show Buyer Phone</th>
                        <th>Payment Link</th>
                        <th>Copy Link</th>
                        <th>Share Link</th>
                        <th>QR Code Image</th>
                        <th>Share QR Code</th>
                        <th>Download QR Code</th>
                        <th>Edit</th>
                        <th>View</th>
                        <th>Delete</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((paymentLink, index) => (
                        <tr key={paymentLink.id}>
                          <td>{index + 1}</td>
                          <td>{paymentLink.payment_name}</td>
                          <td>{formatAmount(paymentLink.amount)}</td>
                          <td>{paymentLink.currency}</td>
                          <td>
                            {paymentLink.show_promise_option ? (
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
                            {paymentLink.show_card_option ? (
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
                            {paymentLink.show_fund_option ? (
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
                            {paymentLink.show_buyer_name ? (
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
                            {paymentLink.show_buyer_phone ? (
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
                          <td>{paymentLink.payment_link}</td>
                          <td>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  paymentLink.payment_link,
                                  paymentLink.id
                                )
                              }
                            >
                              {isLinkCopied[paymentLink.id] ? (
                                <span>
                                  <i className="fa fa-check"></i> Copied
                                </span>
                              ) : (
                                <span>
                                  <i className="fa fa-copy"></i> Copy
                                </span>
                              )}
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() =>
                                shareLink(paymentLink.payment_link)
                              }
                            >
                              Share <i className="fas fa-share-alt"></i>
                            </Button>
                          </td>
                          <td ref={(el) => (qrCodeRefs.current[index] = el)}>
                            <QRCode
                              value={paymentLink.payment_link}
                              size={64}
                            />
                          </td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => shareQRCode(index)}
                            >
                              Share QR Code <i className="fas fa-share-alt"></i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => downloadQRCode(index)}
                            >
                              Download QR Code{" "}
                              <i className="fas fa-download"></i>
                            </Button>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm">
                              <Link
                                to={`/payment-link/${paymentLink.seller_username}/${paymentLink.id}/`}
                                style={{ textDecoration: "none" }}
                              >
                               <i className="fas fa-edit"></i> Edit
                              </Link>
                            </Button>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm">
                              <Link
                                // to={`/payment-link/${paymentLink.seller_username}/${paymentLink.id}/`}
                                to={`/payment-link?ref=${paymentLink.seller_username}&pk=${paymentLink.id}`}
                                style={{ textDecoration: "none" }}
                              >
                               <i className="fas fa-eye"></i> View
                              </Link>
                            </Button>
                          </td>
                          <td>
                            <Button variant="outline-danger" size="sm">
                              <Link
                                to={`/payment-link/${paymentLink.seller_username}/${paymentLink.id}/`}
                                style={{ textDecoration: "none" }}
                              >
                               <i className="fas fa-trash"></i> Delete
                              </Link>
                            </Button>
                          </td>
                          <td>
                            {new Date(paymentLink.timestamp).toLocaleString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={paymentLinks.length}
                  paginate={paginate}
                />
              </>
            )}

            <div className="d-flex justify-content-center mt-5 py-3">
              <Button
                variant="primary"
                onClick={handleCreatePaymentLink}
                className="rounded"
              >
                Create Payment Link
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentLinks;