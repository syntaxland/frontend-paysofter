// PaymentLinks.js
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Button, Table, Row, Col, Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { getSellerPaymentLinks } from "../../redux/actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import DeletePaymentLink from "./DeletePaymentLink";
import { formatAmount } from "../FormatAmount";
import QRCode from "qrcode.react";

function PaymentLinks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const qrCodeRefs = useRef([]);

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
          title: "Paysofter Link",
          text: "Check out this Paysofter link!",
          url: link,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed:", error));
    } else {
      alert("Please manually share the Paysofter link: " + link);
    }
  };

  const downloadQRCode = (index) => {
    const canvas = qrCodeRefs.current[index].querySelector("canvas");
    const qrUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "paysofter-link-qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareQRCode = (index) => {
    const canvas = qrCodeRefs.current[index].querySelector("canvas");
    canvas.toBlob((blob) => {
      const file = new File([blob], "paysofter-link-qr-code.png", {
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
        downloadQRCode(index);
      }
    });
  };

  const handleCreatePaymentLink = () => {
    history.push("/create-link/");
  };

  const [selectedLink, setSelectedLink] = useState(null);
  const [deleteLinkModal, setDeleteLinkModal] = useState(false);
  const handleDeleteLinkOpen = (link) => {
    setSelectedLink(link);
    console.log(
      "link:",
      link,
      "link.id",
      link.id,
      "selectedLink:",
      selectedLink
    );
    setDeleteLinkModal(true);
  };
  const handleDeleteLinkClose = () => {
    setDeleteLinkModal(false);
  };

  // const [editLinkModal, setEditLinkModal] = useState(false);
  // const handleEditLinkOpen = (link) => {
  //   setSelectedLink(link);
  //   setEditLinkModal(true);
  // };
  // const handleEditLinkClose = () => {
  //   setEditLinkModal(false);
  // };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          <div>
            <h1 className="text-center py-3">
              <FontAwesomeIcon icon={faQrcode} /> Paysofter Links
            </h1>
            {/* <div className="text-center py-1">Company Logo</div> */}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {currentItems.length === 0 ? (
                  <div className="text-center py-3">
                    Paysofter links appear here.
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
                        {/* <th>Link</th> */}
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
                          {/* <td>{paymentLink.payment_link}</td> */}
                          <td>
                            <Button
                              variant="outline-transparent"
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
                              Share <i className="fas fa-share-alt"></i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => downloadQRCode(index)}
                            >
                              <i className="fas fa-download"></i> Download
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              disabled
                            >
                              <Link
                                to={`/edit-link/${paymentLink.seller_username}/${paymentLink.id}/`}
                                style={{ textDecoration: "none" }}
                              >
                                <i className="fas fa-edit"></i> Edit
                              </Link>
                            </Button>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm">
                              <Link
                                to={`/link?ref=${paymentLink.seller_username}&pk=${paymentLink.id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <i className="fas fa-eye"></i> View
                              </Link>
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteLinkOpen(paymentLink)}
                            >
                              <i className="fas fa-trash"></i> Delete
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
                Create Link
              </Button>
            </div>

            <Modal show={deleteLinkModal} onHide={handleDeleteLinkClose}>
              <Modal.Header closeButton>
                <Modal.Title className="text-center w-100 py-2">
                  Delete Link
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {deleteLinkModal && (
                  <DeletePaymentLink
                    linkId={selectedLink?.id}
                    linkName={selectedLink?.payment_name}
                  />
                )}
              </Modal.Body>
            </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentLinks;
